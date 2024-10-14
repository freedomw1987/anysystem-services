import fs from "fs";
import path from "path";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
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
  .use(
    swagger({
      exclude: ["/", "/healthcheck"],
      documentation: {
        tags: [{ name: "Auth", description: "Authentication API" }],
      },
    })
  )
  .use(AuthController)
  .get("/", () => indexHtml)
  .get("/healthcheck", () => ({ status: "OK" }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
