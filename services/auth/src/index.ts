import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { html } from "@elysiajs/html";
//Routers
import { authRoutes, userRoutes } from "./routers/";

const port = process.env.PORT || 8000;

new Elysia()
  .use(cors())
  .use(
    swagger({
      exclude: ["/health-check", "/"],
      documentation: {
        servers: [
          { url: "http://localhost:8000", description: "for development" },
        ],
        info: {
          title: "AnySystem Services - Auth Service",
          description:
            "This is a api documentation for AnySystem Services - Auth Service",
          version: "1.0.0",
        },
        tags: [
          {
            name: "Auth",
            description: "Authentication management",
          },
          {
            name: "User",
            description: "User management",
          },
        ],
      },
    })
  )
  .use(html())
  .all(
    "/",
    () =>
      `
      <h1>Welcome to AnySystem Services - Auth Service</h1>
      <p>You can access our documentation at <a href="/swagger">/Swagger</a></p>
    `
  )
  .all("/health-check", () => ({
    status: "ok",
  }))
  .use(authRoutes)
  .use(userRoutes)
  .listen(port);

console.log(`Listening on http://localhost:${port}`);
