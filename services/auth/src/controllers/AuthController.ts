import { Elysia } from "elysia";
import { ip } from "elysia-ip";
import {
  SignupSchema,
  SignupResponseSchema,
  SignupFailureSchema,
  signup,
} from "../models/Signup";
import { SigninSchema, SigninResponseSchema, signin } from "../models/Signin";

export const AuthController = new Elysia({ prefix: "/auth" })
  .use(ip())
  //signup
  .post(
    "/signup",
    async ({ body, ip }) => {
      const user = await signup({ ...body, ip });
      if (!user) {
        return {
          status: 401,
          message: "Signup failed",
        };
      }
      return user;
    },
    {
      detail: {
        summary: "User sign up",
        tags: ["Auth"],
      },
      body: SignupSchema,
      response: {
        200: SignupResponseSchema,
        401: SignupFailureSchema,
      },
      error({ set }) {
        set.status = 401;
        return {
          status: 401,
          message: "Signup failed",
        };
      },
    }
  )
  //signin
  .post(
    "/signin",
    async ({ body, ip }) => {
      const user = await signin({ ...body, ip });
      if (!user) {
        return {
          status: 401,
          message: "Login failed",
        };
      }
      return user;
    },
    {
      detail: {
        summary: "User signin",
        tags: ["Auth"],
      },
      body: SigninSchema,
      response: {
        200: SigninResponseSchema,
        401: SignupFailureSchema,
      },
      error({ set }) {
        set.status = 401;
        return {
          status: 401,
          message: "Login failed",
        };
      },
    }
  );
