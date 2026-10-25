// Technical site settings (not edited in the CMS).
// Absolute URL of the published site – used for og:url / og:image. Always ends with "/",
// so SITE_URL=https://www.physiotherapie-kemper.de works the same as …de/.
const url = (process.env.SITE_URL || "https://frederik-witte.github.io/physiotherapie-kemper/").trim().replace(/\/*$/, "/");

export default {
  url,
  // Preview of a redesign: keep it out of search engines until it replaces the live site.
  robots: process.env.ROBOTS || "noindex, nofollow",
  jahr: new Date().getFullYear(),
};
