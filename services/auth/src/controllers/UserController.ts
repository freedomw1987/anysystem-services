import { t } from "elysia";

const UserRouter = (app) => {
  app.post("/user", () => {}, {
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
  });
  return app;
};

export default UserRouter;
