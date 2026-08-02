import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hampers } from "../../server/data/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, "..");
const publicDir = path.join(clientRoot, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const siteUrl = "https://www.fabliss.in";

const staticPages = ["/", "/about", "/contact", "/customise", "/bulk-orders"];

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const urls = [
  ...staticPages.map((pathName) => ({ loc: `${siteUrl}${pathName}` })),
  ...hampers.map((hamper) => ({ loc: `${siteUrl}/hampers/${hamper.slug}` })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url><loc>${escapeXml(entry.loc)}</loc></url>`
  )
  .join("\n")}
</urlset>
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(sitemapPath, sitemapXml, "utf8");

console.log(`Generated sitemap with ${urls.length} URLs at public/sitemap.xml`);
