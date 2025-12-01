/**
 * scripts/generate-sitemap.ts
 *
 * Notes:
 *   - Scans `src/articles` for .md and .mdx files (non-recursive).
 *   - Writes `public/sitemap.xml`.
 *   - Keeps a set of static/legal pages preserved.
 */

import fs from "node:fs";
import path from "node:path";
import { format } from "node:util";

const SITE_URL = "https://neoski.vercel.app";
const ARTICLE_URL = `${SITE_URL}/a/%s`;
const ARTICLES_DIR = path.resolve(process.cwd(), "src/articles");
const OUTPUT_FILE = path.resolve(process.cwd(), "public/sitemap.xml");

const STATIC_PAGES: URLEntry[] = [
  { loc: `${SITE_URL}/`, changefreq: "monthly", priority: "1.0" },
  { loc: `${SITE_URL}/security`, changefreq: "yearly", priority: "0.5" },
  { loc: `${SITE_URL}/privacy`, changefreq: "yearly", priority: "0.5" },
  { loc: `${SITE_URL}/code-of-conduct`, changefreq: "yearly", priority: "0.4" },
];

type URLEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Very small slugifier for filenames */
function slugifyFilename(name: string) {
  // remove extension first
  const base = name.replace(/\.[^.]+$/, "");
  // normalize whitespace/underscores, remove unsafe chars, collapse dashes
  return base
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-")
    .replace(/[^a-z0-9-]/g, "") // allow only a-z0-9 and dash
    .replace(/-+/g, "-");
}

async function listArticleFiles(): Promise<string[]> {
  try {
    const entries = await fs.promises.readdir(ARTICLES_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => /\.(md|mdx)$/.test(name));
  } catch (err) {
    if ((err && err.code) === "ENOENT") {
      // no articles directory — return empty list (safe)
      return [];
    }
    throw err;
  }
}

function toURLEntryForArticle(filename: string, stats: fs.Stats): URLEntry {
  const slug = slugifyFilename(filename);
  const loc = format(ARTICLE_URL, encodeURIComponent(slug));
  const lastmod = stats.mtime.toISOString();
  return {
    loc,
    lastmod,
    changefreq: "monthly",
    priority: "0.8",
  } satisfies URLEntry;
}

function buildXml(urls: URLEntry[]) {
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">');

  console.log('Building sitemap.xml for entries ...');

  for (const u of urls) {
    console.log(`  | ${u.loc}`);

    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(u.loc)}</loc>`);
    if (u.lastmod) lines.push(`    <lastmod>${escapeXml(u.lastmod)}</lastmod>`);
    if (u.changefreq) lines.push(`    <changefreq>${escapeXml(u.changefreq)}</changefreq>`);
    if (u.priority) lines.push(`    <priority>${escapeXml(u.priority)}</priority>`);
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  return lines.join("\n");
}

async function main() {
  // Collect static pages first (they will always be present)
  const urls: URLEntry[] = [ ...STATIC_PAGES ];

  console.log('Getting article slugs...');

  // Discover articles
  const files = await listArticleFiles();
  for (const f of files) {
    const full = path.join(ARTICLES_DIR, f);
    try {
      const stats = await fs.promises.stat(full);
      urls.push(toURLEntryForArticle(f, stats));
      console.log(`  | ${f}`);
    } catch (err) {
      // skip unreadable file but log a warning
      console.warn(`Warning: unable to stat article file "${full}". Skipping.`);
      console.warn('Error message:', (err as Error).message);
    }
  }

  // Build XML and write
  const xml = buildXml(urls);

  // Ensure public dir exists
  const publicDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(publicDir)) {
    await fs.promises.mkdir(publicDir, { recursive: true });
  }
  await fs.promises.writeFile(OUTPUT_FILE, xml, { encoding: "utf8" });

  console.log(`\nsitemap.xml generated: ${OUTPUT_FILE} (${urls.length} entries)`);
}

main().catch((err) => {
  console.error("Failed to generate sitemap:", err);
  process.exit(1);
});

