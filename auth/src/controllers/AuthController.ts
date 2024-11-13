import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";
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
import { sendEmail } from "../models/SMTP";

export const AuthController = new Elysia({ prefix: "/auth" })
  .use(ip())
  .use(bearer())
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
      });
      if (!user) {
        return {
          status: 401,
          message: "Login failed",
        };
      }
      const token = await jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      });
      return { ...user, token };
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
      });
      if (!user) {
        return {
          status: 401,
          message: "Forgot password failed",
        };
      }

      const token = await jwt.sign({
        id: user.id,
      });

      await sendEmail({
        from: "info@marstree.ltd",
        to: [user.email],
        subject: "Forgot password",
        content: `Hi ${user.name}, please use this link to reset your password: ${process.env.APP_URL}/reset-password?token=${token}`,
        isHtml: false,
      });
      return { ...user, token };
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
    }
  )
  //reset password
  .put(
    "/reset-password",
    async ({ bearer, body, ip, jwt }) => {
      if (!bearer) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }

      const profile = await jwt.verify(bearer);

      if (!profile) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const user = await resetPassword({
        ...body,
        ip,
        id: profile?.id as string,
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
        description:
          "User reset password, requires Bearer token. Please get token from POST /auth/forgot-password endpoint",
        tags: ["Auth"],
        security: [{ bearerAuth: [] }],
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
      beforeHandle({ bearer, set }) {
        if (!bearer) {
          set.status = 401;
          set.headers[
            "WWW-Authenticate"
          ] = `Bearer realm='sign', error="invalid_request"`;
          return {
            status: 401,
            message: "Unauthorized",
          };
        }
      },
    }
  );
