import fs from "fs";
import path from "path";
import { Elysia } from "elysia";
import { ip } from "elysia-ip";
import { html } from "@elysiajs/html";
import { compression } from "@labzzhq/compressor";
import { swagger } from "@elysiajs/swagger";
import { serverTiming } from "@elysiajs/server-timing";

//controllers
import { OrgController } from "./controllers/OrgController";
import { LicenseController } from "./controllers/LicenseController";

const indexHtml = fs.readFileSync(
  path.join(__dirname, "./views/index.html"),
  "utf-8"
);

const app = new Elysia()
  .use(
    compression({
      compress_stream: true,
      encodings: ["deflate", "gzip"],
    })
  )
  .use(
    serverTiming({
      enabled: process.env.ENV_MODE !== "prod",
    })
  )
  .use(ip())
  .use(html())
  .use(OrgController)
  .use(LicenseController)
  .get("/", () => indexHtml)
  .get("/healthcheck", () => ({ status: "OK" }));

if (process.env.ENV_MODE !== "prod") {
  app.use(
    swagger({
      exclude: ["/", "/healthcheck"],
      documentation: {
        info: {
          version: "1.0.0",
          title: "License API",
          description: "API for license management",
        },
        tags: [
          {
            name: "Organization",
            description: "API for organizations management",
          },
          { name: "License", description: "API for licenses management" },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              description: "JWT Authorization header using the Bearer scheme.",
              bearerFormat: "JWT",
            },
          },
        },
      },
    })
  );
}

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
