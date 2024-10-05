import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { html } from "@elysiajs/html";
//Router

const port = process.env.PORT || 8000;

new Elysia()
  .use(cors())
  .use(
    swagger({
      exclude: ["/health-check", "/"],
      documentation: {
        tags: [{ name: "User", description: "User management" }],
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
  .post("/user", () => {}, {
    contentType: "application/json",
    detail: {
      description: "Create a user",
      tags: ["User"],
    },
    body: t.Object({
      email: t.String({
        format: "email",
        examples: ["pQXt9@example.com"],
      }),
      password: t.String({
        format: "md5-hash",
        examples: ["827ccb0eea8a706c4c34a16891f84e7b"],
      }),
      name: t.String({
        examples: ["John Doe"],
      }),
      phoneNumber: t.String({
        format: "phone",
        examples: ["853-66297530"],
      }),
      address: t.Optional(t.String()),
    }),
  })
  .onError(({ code, set, error }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      console.log("error:", error);
      return "Not found";
    }
  })
  .listen(port);

console.log(`Listening on http://localhost:${port}`);
