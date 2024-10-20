import fs from "fs";
import path from "path";
import { Elysia } from "elysia";
import { ip } from "elysia-ip";
import { html } from "@elysiajs/html";
import { compression } from "elysia-compression";
import { swagger } from "@elysiajs/swagger";
//controllers
import { OrgController } from "./controllers/OrgController";

const indexHtml = fs.readFileSync(
  path.join(__dirname, "./views/index.html"),
  "utf-8"
);

const app = new Elysia()
  .use(compression())
  .use(ip())
  .use(html())
  .use(OrgController)
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
        tags: [{ name: "Organization", description: "API for organizations" }],
      },
    })
  );
}

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
