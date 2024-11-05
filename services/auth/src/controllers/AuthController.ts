import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { ip } from "elysia-ip";
import { SECRET_EXPIRES, SECRET_KEY } from "../constants/config";
import {
  SignupSchema,
  SignupResponseSchema,
  SignupFailureSchema,
  signup,
} from "../models/Signup";
import {
  SigninSchema,
  SigninResponseSchema,
  SigninFailureSchema,
  signin,
} from "../models/Signin";
import {
  ForgotPasswordSchema,
  ForgotPasswordResponseSchema,
  ForgotPasswordFailureSchema,
  forgotPassword,
} from "../models/ForgotPassword";
import {
  ResetPasswordSchema,
  ResetPasswordResponseSchema,
  ResetPasswordFailureSchema,
  resetPassword,
} from "../models/ResetPassword";

export const AuthController = new Elysia({ prefix: "/auth" })
  .use(ip())
  .use(
    jwt({
      name: "jwt",
      secret: SECRET_KEY,
      exp: SECRET_EXPIRES,
    })
  )
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
      security: [],
    }
  )
  //signin
  .post(
    "/signin",
    async ({ jwt, body, ip }) => {
      const user = await signin({
        ...body,
        ip,
        token: await jwt.sign({ ...body }),
      });
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
        summary: "User sign in",
        tags: ["Auth"],
      },
      body: SigninSchema,
      response: {
        200: SigninResponseSchema,
        401: SigninFailureSchema,
      },
      error({ set }) {
        set.status = 401;
        return {
          status: 401,
          message: "Login failed",
        };
      },
      security: [],
    }
  )
  //forgot password
  .post(
    "/forgot-password",
    async ({ jwt, body, ip }) => {
      const user = await forgotPassword({
        ...body,
        ip,
        token: await jwt.sign({ ...body }),
      });
      if (!user) {
        return {
          status: 401,
          message: "Forgot password failed",
        };
      }
      return user;
    },
    {
      detail: {
        summary: "User forgot password",
        tags: ["Auth"],
      },
      body: ForgotPasswordSchema,
      response: {
        200: ForgotPasswordResponseSchema,
        401: ForgotPasswordFailureSchema,
      },
      error({ set }) {
        set.status = 401;
        return {
          status: 401,
          message: "Forgot password failed",
        };
      },
      security: [],
    }
  )
  //reset password
  .put(
    "/reset-password",
    async ({ body, ip, jwt }) => {
      const user = await resetPassword({
        ...body,
        ip,
        renewToken: await jwt.sign({ id: body.id }),
      });
      if (!user) {
        return {
          status: 401,
          message: "Reset password failed",
        };
      }
      return user;
    },
    {
      detail: {
        summary: "User reset password",
        tags: ["Auth"],
      },
      body: ResetPasswordSchema,
      response: {
        200: ResetPasswordResponseSchema,
        401: ResetPasswordFailureSchema,
      },
      error({ set }) {
        set.status = 401;
        return {
          status: 401,
          message: "Reset password failed",
        };
      },
      security: [],
    }
  );
