import { Elysia } from "elysia";
import { SignupSchema, SignupResponseSchema, signup } from "../models/Signup";

export const AuthController = new Elysia({ prefix: "/auth" }).post(
  "/signup",
  async ({ body }) => await signup(body),
  {
    detail: {
      summary: "User sign up",
      tags: ["Auth"],
    },
    body: SignupSchema,
    response: {
      200: SignupResponseSchema,
    },
    error({ set }) {
      set.status = 401;
    },
  }
);
