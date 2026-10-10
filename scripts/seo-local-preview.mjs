import indexingGuard from "../netlify/edge-functions/indexing-guard.js";
import fs from "node:fs";
import http from "node:http";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const modules = process.env.NETLIFY_TEST_MODULES;
if (!modules)
  throw new Error(
    "Set NETLIFY_TEST_MODULES to the node_modules directory of an installed Netlify CLI.",
  );
const { RedirectsHandler } = await import(
  pathToFileURL(modules + "/@netlify/redirects/dist/main.js")
);
const { parse } = require(modules + "/smol-toml");
const { default: legacyNews } =
  await import("../netlify/edge-functions/legacy-news.js");
const config = parse(fs.readFileSync("netlify.toml", "utf8"));
const redirects = new RedirectsHandler({
  configRedirects: config.redirects,
  projectDir: process.cwd(),
  publicDir: process.cwd() + "/public",
  jwtRoleClaim: "",
  jwtSecret: "",
});
http
  .createServer(async (req, res) => {
    try {
      const request = new Request("http://127.0.0.1:8890" + req.url);
      const next = async () => {
        const match = await redirects.match(request);
        if (match?.redirect)
          return new Response(null, {
            status: match.statusCode,
            headers: { Location: match.targetRelative },
          });
        return fetch("http://127.0.0.1:3012" + req.url, { redirect: "manual" });
      };
      const response = await indexingGuard(request, {
        next: () => legacyNews(request, { next }),
      });
      res.writeHead(
        response.status,
        Object.fromEntries(
          [...response.headers].filter(
            ([k]) =>
              ![
                "content-encoding",
                "content-length",
                "transfer-encoding",
              ].includes(k),
          ),
        ),
      );
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      console.error(error);
      res.writeHead(500);
      res.end(String(error));
    }
  })
  .listen(8890, "127.0.0.1", () =>
    console.log(
      "Netlify redirect engine + actual edge handler -> Next production 3012; local port 8890",
    ),
  );
