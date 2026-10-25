// Eleventy 3 configuration for the Physiotherapie Kemper website.
// All visible content lives in src/_data/*.yml (edited by the practice via Sveltia CMS).
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

import { HtmlBasePlugin } from "@11ty/eleventy";
import Image, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import yaml from "js-yaml";
import markdownIt from "markdown-it";

const require = createRequire(import.meta.url);

// GitHub Pages serves the site under /physiotherapie-kemper/; a custom domain would use "/".
const PATH_PREFIX = process.env.PATH_PREFIX || "/";

const IMAGE_WIDTHS = [480, 800, 1200, 1600];
// Encoder settings shared by the <img> transform and the og:image shortcode. eleventy-img hashes
// the source file plus these options, so both produce the same file name and the share image
// reuses the 1600px jpeg of the page instead of writing a second copy.
const IMAGE_ENCODING = {
  sharpWebpOptions: { quality: 78 },
  sharpJpegOptions: { quality: 80, progressive: true, mozjpeg: true },
};

// Tailwind CLI (v4) – compiled before every Eleventy build (also in --serve mode)
const TAILWIND_CLI = path.join(path.dirname(require.resolve("@tailwindcss/cli/package.json")), "dist", "index.mjs");

const md = markdownIt({ html: false, linkify: false, typographer: false, breaks: false });

/* ---------- Helpers for contact placeholders ---------- */
// Texts can contain placeholders that are filled from praxis.yml, so phone, e-mail and
// address only ever live in one place: {telefon} {fax} {email} {strasse} {plz} {ort}
// {stadtteil} {lage} {name} {rechtsname} {route}
// {strasse_lang} writes the street out in full ("Moosbergstr. 4" → "Moosbergstraße 4") for running text.
// {route} links to praxis.routenlink; its text is the route button's text (startseite.yml → kontakt.button_route).
const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const PLACEHOLDER = /\{\s*(telefon|fax|e-?mail|strasse_lang|straße_lang|strasse|straße|plz|ort|stadtteil|lage|name|rechtsname|route)\s*\}/gi;

// "Moosbergstr. 4" → "Moosbergstraße 4" (house number kept on the same line)
const streetInFull = (street) =>
  String(street ?? "")
    .replace(/str\.(?=\s|$)/gi, (m) => (m[0] === "S" ? "Straße" : "straße"))
    .replace(/\s+(\d[\w\-\/]*)$/, "\u00a0$1");

// Text of the {route} link: the same wording as the "Route planen" button in the contact section.
// Filters read it from the template data (Nunjucks passes it as this.ctx).
const routeLabel = (ctx) => String(ctx?.startseite?.kontakt?.button_route ?? "").trim() || "Route planen";

function placeholderValue(key, praxis = {}, route = "Route planen") {
  switch (key.toLowerCase().replace("-", "").replace("ß", "ss")) {
    case "telefon": return praxis.telefon;
    case "fax": return praxis.fax;
    case "email": return praxis.email;
    case "strasse": return praxis.strasse;
    case "strasse_lang": return streetInFull(praxis.strasse);
    case "plz": return praxis.plz;
    case "ort": return praxis.ort;
    case "stadtteil": return praxis.stadtteil;
    case "lage": return praxis.lage;
    case "name": return praxis.name;
    case "rechtsname": return praxis.rechtsname;
    case "route": return route;
    default: return "";
  }
}

// Plain text replacement (for meta tags, alt texts, captions …) – result is escaped by Nunjucks
function fillPlain(text, praxis, route) {
  return String(text ?? "").replace(PLACEHOLDER, (_, key) => placeholderValue(key, praxis, route) ?? "");
}

// HTML replacement: phone, e-mail and route become links in the design's link style
function fillHtml(html, praxis = {}, variant = "dark", route = "Route planen") {
  const linkClass = variant === "light" ? "text-link-light" : "text-link";
  return String(html ?? "").replace(PLACEHOLDER, (_, key) => {
    const k = key.toLowerCase().replace("-", "").replace("ß", "ss");
    if (k === "telefon" && praxis.telefon) {
      return `<a href="tel:${escapeHtml(praxis.telefon_link)}" class="${linkClass} whitespace-nowrap">${escapeHtml(praxis.telefon)}</a>`;
    }
    if (k === "email" && praxis.email) {
      return `<a href="mailto:${escapeHtml(praxis.email)}" class="${linkClass} break-words">${escapeHtml(praxis.email)}</a>`;
    }
    if (k === "route" && praxis.routenlink) {
      return `<a href="${escapeHtml(praxis.routenlink)}" target="_blank" rel="noopener" class="${linkClass} whitespace-nowrap">${escapeHtml(route)}<span class="sr-only"> (öffnet Google Maps in einem neuen Fenster)</span></a>`;
    }
    return escapeHtml(placeholderValue(key, praxis, route));
  });
}

/* ---------- Opening hours ---------- */
// A row counts as closed when "geschlossen" is switched on, the time is empty or the time is
// the word "geschlossen" – so a half-filled row never shows "geschlossen Uhr" or a bare day.
function oeffnungszeiten(zeiten) {
  return (Array.isArray(zeiten) ? zeiten : [])
    .filter((z) => z && String(z.tage ?? "").trim())
    .map((z) => {
      const text = String(z.zeiten ?? "").trim();
      const geschlossen = Boolean(z.geschlossen) || !text || /^geschlossen$/i.test(text);
      return {
        tage: z.tage,
        zeiten: text || "geschlossen",
        geschlossen,
        // " Uhr" is added in the FAQ table unless the row is closed or already ends with "Uhr"
        uhr: !geschlossen && !/\buhr$/i.test(text),
      };
    });
}

/* ---------- Soft hyphens in headings ---------- */
// "Lymph|drainage": a vertical bar (visible in the CMS) marks where a long word may be hyphenated.
// It becomes a soft hyphen (&shy;) in headings and is removed everywhere else. U+00AD typed or
// pasted directly is treated the same way.
const TRENNSTELLE = /\||\u00ad/g;

const umlauts = { ä: "ae", ö: "oe", ü: "ue", ß: "ss" };

export default function (eleventyConfig) {
  /* ---------- Data: YAML files in src/_data ---------- */
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  /* ---------- Static files ---------- */
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });

  /* ---------- CMS: Sveltia CMS at /admin/ ---------- */
  // Passthrough copies are written as they are: no Nunjucks, no image transform, no HtmlBasePlugin.
  // index.html loads sveltia-cms.js and config.yml with relative URLs, so it works under any path prefix.
  eleventyConfig.addPassthroughCopy("src/admin");
  // Self-hosted from npm (pinned in package.json) instead of the unpkg CDN.
  eleventyConfig.addPassthroughCopy({ "node_modules/@sveltia/cms/dist/sveltia-cms.js": "admin/sveltia-cms.js" });
  // Chunks the CMS loads on demand from next to sveltia-cms.js (git, qrcode, react-dom), source maps left out.
  eleventyConfig.addPassthroughCopy(
    { "node_modules/@sveltia/cms/dist/chunks": "admin/chunks" },
    { filter: ["**/*.js"] },
  );

  /* ---------- Tailwind CSS → _site/styles.css ---------- */
  eleventyConfig.addWatchTarget("src/styles/");
  eleventyConfig.on("eleventy.before", ({ directories }) => {
    const output = path.join(directories?.output || "_site", "styles.css");
    try {
      execFileSync(process.execPath, [TAILWIND_CLI, "-i", "src/styles/input.css", "-o", output, "--minify"], {
        stdio: "pipe",
      });
    } catch (error) {
      throw new Error(`Tailwind CSS build failed:\n${error.stderr || error.message}`);
    }
  });

  /* ---------- URLs: prefix root-absolute URLs for GitHub Pages ---------- */
  eleventyConfig.addPlugin(HtmlBasePlugin);

  /* ---------- Responsive images (webp + jpeg) for every <img> ---------- */
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    ...IMAGE_ENCODING,
    formats: ["webp", "jpeg"],
    widths: IMAGE_WIDTHS,
    // A photo that a YAML file still uses but that no longer exists stops the build (ENOENT).
    // The previous deployment then stays online; ANLEITUNG.md explains how to fix it.
    failOnError: true,
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async" },
    },
  });

  // Share image (og:image) – one 1600px jpeg with an absolute URL
  eleventyConfig.addAsyncShortcode("ogBild", async function (src, alt, siteUrl) {
    if (!src) return "";
    const metadata = await Image(path.join("src", src), {
      ...IMAGE_ENCODING,
      widths: [1600],
      formats: ["jpeg"],
      outputDir: path.join(eleventyConfig.directories.output, "img"),
      urlPath: "/img/",
    });
    const img = metadata.jpeg[metadata.jpeg.length - 1];
    const absolute = new URL(img.url.replace(/^\//, ""), siteUrl).href;
    return [
      `<meta property="og:image" content="${escapeHtml(absolute)}">`,
      `<meta property="og:image:type" content="image/jpeg">`,
      `<meta property="og:image:width" content="${img.width}">`,
      `<meta property="og:image:height" content="${img.height}">`,
      `<meta property="og:image:alt" content="${escapeHtml(alt)}">`,
    ].join("\n  ");
  });

  /* ---------- Filters ---------- */
  // Markdown fields (rendered with markdown-it); placeholders are filled afterwards
  // (regular functions, not arrows: `this.ctx` holds the template data for the {route} link text)
  eleventyConfig.addFilter("markdown", function (value, praxis, variant) {
    return fillHtml(md.render(String(value ?? "")), praxis, variant, routeLabel(this?.ctx));
  });
  // Plain text with placeholders → safe HTML (phone/e-mail/route become links)
  eleventyConfig.addFilter("platzhalter", function (value, praxis, variant) {
    return fillHtml(escapeHtml(value), praxis, variant, routeLabel(this?.ctx));
  });
  // Plain text with placeholders → plain text (meta tags, alt texts)
  eleventyConfig.addFilter("klartext", function (value, praxis) {
    return fillPlain(value, praxis, routeLabel(this?.ctx));
  });
  // Keep phone numbers etc. on one line
  eleventyConfig.addFilter("nbsp", (value) => String(value ?? "").replace(/ /g, " "));
  // "Inhaber · Geschäftsführer" → no line break before the middle dot
  eleventyConfig.addFilter("punkte", (value) => String(value ?? "").replace(/ · /g, " · "));
  // Words with a hyphen (e.g. "Hannover-Stöcken") never break → safe HTML
  eleventyConfig.addFilter("keinUmbruch", (value) =>
    escapeHtml(value).replace(/(\S+-\S+)/g, '<span class="whitespace-nowrap">$1</span>'),
  );
  // Line breaks in multi-line text fields → <br>
  eleventyConfig.addFilter("zeilen", (value) =>
    escapeHtml(String(value ?? "").trim()).replace(/\r?\n/g, "<br>"),
  );
  // Text without its last word / only the last word (for the underlined link word)
  eleventyConfig.addFilter("ohneLetztesWort", (value) => String(value ?? "").trim().split(/\s+/).slice(0, -1).join(" "));
  eleventyConfig.addFilter("letztesWort", (value) => String(value ?? "").trim().split(/\s+/).pop());
  // Initials for monogram avatars: first letter of first and last name
  eleventyConfig.addFilter("initiale", (name, which = "first") => {
    const parts = String(name ?? "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "";
    const word = which === "last" ? (parts.length > 1 ? parts[parts.length - 1] : "") : parts[0];
    return word.charAt(0).toUpperCase();
  });
  // List entries that actually have an image (empty CMS image fields are skipped)
  eleventyConfig.addFilter("mitBild", (liste, feld = "bild") => (Array.isArray(liste) ? liste : []).filter((x) => x && x[feld]));
  // Opening hours as normalised rows {tage, zeiten, geschlossen, uhr} (contact section, FAQ)
  eleventyConfig.addFilter("oeffnungszeiten", oeffnungszeiten);
  // Opening hours without the closed days (for the short lists in menu and footer)
  eleventyConfig.addFilter("geoeffnet", (zeiten) => oeffnungszeiten(zeiten).filter((z) => !z.geschlossen));
  // Stable ids for anchors
  eleventyConfig.addFilter("kennung", (value) =>
    String(value ?? "")
      .replace(TRENNSTELLE, "")
      .toLowerCase()
      .replace(/[äöüß]/g, (c) => umlauts[c])
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  );
  // Remove hyphenation marks (e.g. for navigation labels)
  eleventyConfig.addFilter("ohneTrennung", (value) => String(value ?? "").replace(TRENNSTELLE, ""));
  // Headings: hyphenation marks → &shy; (safe HTML)
  eleventyConfig.addFilter("trennstellen", (value) => escapeHtml(value).replace(TRENNSTELLE, "&shy;"));
  // Logo: "Physiotherapie Kemper" → first word / rest
  eleventyConfig.addFilter("erstesWort", (value) => String(value ?? "").trim().split(/\s+/)[0]);
  eleventyConfig.addFilter("restWorte", (value) => String(value ?? "").trim().split(/\s+/).slice(1).join(" "));
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
    includes: "_includes",
    data: "_data",
  },
  pathPrefix: PATH_PREFIX,
  templateFormats: ["njk"],
  htmlTemplateEngine: "njk",
};
