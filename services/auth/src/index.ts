import fs from "fs";
import path from "path";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { compression } from "elysia-compression";
import { ip } from "elysia-ip";
//constrollers
import { AuthController } from "./controllers/AuthController";

const indexHtml = fs.readFileSync(
  path.join(__dirname, "./views/index.html"),
  "utf-8"
);

const app = new Elysia()
  .use(html())
  .use(ip())
  .use(compression())
  .use(AuthController)
  .get("/", () => indexHtml)
  .get("/healthcheck", () => ({ status: "OK" }));

if (process.env.ENV_MODE !== "prod") {
  app.use(
    swagger({
      exclude: ["/", "/healthcheck"],
      documentation: {
        info: {
          version: "1.0.0",
          title: "Auth API",
          description: "API for authentication",
        },
        tags: [{ name: "Auth", description: "Authentication API" }],
      },
    })
  );
}

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
