# Physiotherapie Kemper – Website

Website of Physiotherapie Kemper (Hannover-Stöcken). All content lives in YAML files and is edited by the practice through a Git-based CMS. Every save is a commit to `main`, which rebuilds and deploys the site to GitHub Pages.

- Live preview: <https://frederik-witte.github.io/physiotherapie-kemper/>
- CMS: <https://frederik-witte.github.io/physiotherapie-kemper/admin/>
- Guide for the practice (German, non-technical): [ANLEITUNG.md](ANLEITUNG.md)

## Stack

- [Eleventy 3](https://www.11ty.dev/) with Nunjucks templates. All data is in `src/_data/*.yml` (loaded with js-yaml), and Markdown fields are rendered with markdown-it.
- [Tailwind CSS v4](https://tailwindcss.com/) via the standalone CLI. An `eleventy.before` hook compiles `src/styles/input.css` to `_site/styles.css` on every build and serve rebuild.
- [@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/) transforms every `<img>` into `<picture>` (webp + jpeg, 480–1600px). Originals live in `src/assets/bilder/` (also the CMS media folder) and are not copied to the output as-is.
- [Sveltia CMS](https://sveltiacms.app/) is self-hosted from npm under `/admin/` (`src/admin/config.yml`), with a German UI and the GitHub backend.
- GitHub Actions deploys to GitHub Pages (`.github/workflows/deploy.yml`).

```
src/
  _data/         editable content (*.yml) + site.js / eleventyComputed.js (technical, not in the CMS)
  _includes/     layout, partials, homepage sections
  admin/         Sveltia CMS (index.html, config.yml)
  assets/        bilder/ (photos, CMS media folder), fonts/ (self-hosted woff2)
  styles/        input.css (Tailwind entry)
  index.njk  impressum.njk  datenschutz.njk
```

Texts may contain placeholders such as `{telefon}`, `{email}` or `{strasse}`. They are filled from `praxis.yml`, so contact details exist in one place only (see `eleventy.config.js`). `{route}` becomes a link to `praxis.routenlink` whose text is the contact section's route button (`startseite.yml` → `kontakt.button_route`).

A `|` in a service group title (`leistungen.yml`, e.g. `Massage & Lymph|drainage`) marks a hyphenation point: it is rendered as `&shy;` in the heading and stripped from anchors and the overview. Opening-hour rows with an empty time, or the time `geschlossen`, count as closed even when the `geschlossen` toggle is off.

## Development

Use Node 22.13 or newer. CI runs the latest Node 22, and a few dependencies declare `>=22.12`/`>=22.13` engines.

```sh
npm ci
npm run dev     # eleventy --serve → http://localhost:8080
npm run build   # → _site/
```

`npm run dev` serves images on request (`/.11ty/image/…`). Always run `npm run build` for a deployable `_site` (CI always builds fresh).

To try the CMS against your local files, open `http://localhost:8080/admin/` in a Chromium-based browser and choose "work with local repository" (Sveltia uses the File System Access API). Changes are written straight to `src/`. Commit them yourself.

### Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PATH_PREFIX` | `/` | URL prefix applied by Eleventy's `HtmlBasePlugin` to every root-absolute `href`/`src`/`srcset`. GitHub Pages needs `/physiotherapie-kemper/`. |
| `SITE_URL` | `https://frederik-witte.github.io/physiotherapie-kemper/` | Absolute base for `og:url` and `og:image` (a missing trailing slash is added). |
| `ROBOTS` | `noindex, nofollow` | Content of `<meta name="robots">`. |

Templates always use root-absolute URLs (`/assets/…`, `/impressum.html`, `/#kontakt`), so the same source works with or without a prefix:

```sh
PATH_PREFIX=/physiotherapie-kemper/ npm run build   # exactly what CI runs
```

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main` (every CMS save is one) and on manual dispatch:

1. `build` (`contents: read`, `pages: read`): checkout without persisted credentials → Node 22 (npm cache) → `npm ci` → `PATH_PREFIX=/physiotherapie-kemper/ npm run build` → `actions/configure-pages` → `actions/upload-pages-artifact` (`_site`).
2. `deploy` (`pages: write`, `id-token: write`): `actions/deploy-pages` into the `github-pages` environment.

The workflow-level token is `contents: read` only, so the publishing rights never exist while `npm ci` and the build run third-party code.

Concurrency group `pages` without cancellation: deploys run one after another, and a running deploy is never aborted. A failed build leaves the previous deployment online.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Then invite each editor as a collaborator with write access (**Settings → Collaborators**).

A missing image breaks the build on purpose (`failOnError: true`): if a YAML field points to a file that is no longer in `src/assets/bilder/` (for example after an editor deleted a photo under "Medien" that was still in use), eleventy-img stops with `ENOENT … stat 'src/assets/bilder/…'` and the previous deployment stays online. Restore the file or pick another image in that field. ANLEITUNG.md tells editors the same.

## Moving to a custom domain

For example `www.physiotherapie-kemper.de`:

1. **DNS** at the registrar: `CNAME www → frederik-witte.github.io`. For the apex domain, add `A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and optionally `AAAA` `2606:50c0:8000::153` … `2606:50c0:8003::153`) so it redirects to `www`.
2. **GitHub**: Settings → Pages → Custom domain → `www.physiotherapie-kemper.de`, wait for the DNS check, then enable **Enforce HTTPS**. Ideally also verify the domain under the account's Settings → Pages. With an Actions deployment the domain is stored in the repository settings, so a `CNAME` file in `_site` is not needed (GitHub ignores it).
3. **Workflow**: set `PATH_PREFIX: /` in `deploy.yml`, and add `SITE_URL: https://www.physiotherapie-kemper.de/`. Alternatively change the defaults in `src/_data/site.js`.
4. **Remove noindex**: set `ROBOTS: "index, follow"` in the workflow env, or change the default in `src/_data/site.js`.
5. **CMS**: update `site_url` and `display_url` in `src/admin/config.yml`.
6. **Content**: switch off the two "Hinweis zur Vorschau" boxes in `rechtliches.yml` once Impressum and Datenschutz are complete (see the checklist in ANLEITUNG.md).

## Optional: "Sign in with GitHub" (OAuth)

By default editors sign in with a personal access token ("Mit Zugriffstoken anmelden"). For non-technical editors, a one-click GitHub login is nicer. It needs a small OAuth relay, [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth), on Cloudflare Workers (free tier):

1. Deploy `sveltia-cms-auth` to Cloudflare Workers and note the worker URL (`https://sveltia-cms-auth.<subdomain>.workers.dev`).
2. Register a GitHub OAuth app (<https://github.com/settings/applications/new>) with the callback URL `<worker URL>/callback`, then generate a client secret.
3. In the worker's settings, add the variables `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (encrypted) and `ALLOWED_DOMAINS=frederik-witte.github.io` (later the custom domain).
4. In `src/admin/config.yml`, add the worker URL as `base_url` and allow OAuth next to the token (the config currently has `auth_methods: [token]`):

   ```yaml
   backend:
     name: github
     repo: Frederik-Witte/physiotherapie-kemper
     branch: main
     base_url: https://sveltia-cms-auth.<subdomain>.workers.dev
     auth_methods: [oauth, token]
   ```

After the next deploy the sign-in screen shows "Mit GitHub anmelden", and token sign-in keeps working.

Note on tokens: GitHub's fine-grained tokens do not work for repository collaborators on a repository owned by a personal account. Editors who are collaborators on `Frederik-Witte/physiotherapie-kemper` therefore need a classic token with the `repo` scope (ANLEITUNG.md covers both). The OAuth login above, or moving the repository into an organization, avoids this.
