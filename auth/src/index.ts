import fs from "fs";
import path from "path";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { compression } from "@labzzhq/compressor";
import { ip } from "elysia-ip";
//constrollers
import { AuthController } from "./controllers/AuthController";
import { ProfileController } from "./controllers/ProfileController";

const indexHtml = fs.readFileSync(
  path.join(__dirname, "./views/index.html"),
  "utf-8"
);

const app = new Elysia()
  .use(html())
  .use(ip())
  .use(
    compression({
      compress_stream: true,
      encodings: ["gzip", "deflate"],
    })
  )
  .use(AuthController)
  .use(ProfileController)
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
          description: "API for authentication, profile management",
        },
        tags: [
          {
            name: "Auth",
            description:
              "Authentication API: for user login, signup and forgot password",
          },
          {
            name: "Profile",
            description:
              "Profile API: for user get, update profile information",
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
