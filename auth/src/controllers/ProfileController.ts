import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import { ip } from "elysia-ip";
import { SECRET_KEY, SECRET_EXPIRES } from "../constants/config";
import {
  ProfileResponseSchema,
  ProfileFailureSchema,
  profile,
} from "../models/Profile";
import {
  UpdateProfileSchema,
  UpdateProfileResponseSchema,
  UpdateProfileFailureSchema,
  updateProfile,
} from "../models/UpdateProfile";

export const ProfileController = new Elysia({ prefix: "/profile" })
  .use(ip())
  .use(bearer())
  .use(
    jwt({
      name: "jwt",
      secret: SECRET_KEY,
      exp: SECRET_EXPIRES,
    })
  )
  //profile
  .get(
    "",
    async ({ bearer, jwt, ip }) => {
      if (!bearer) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const p = await jwt.verify(bearer);
      if (!p) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }

      const user = await profile({ id: p?.id as string, ip });
      if (!user) {
        return {
          status: 500,
          message: "Profile not found",
        };
      }
      return user;
    },
    {
      detail: {
        summary: "Get User profile",
        description:
          "Get User profile, requires Bearer token. Please get token from POST /auth/signin endpoint",
        tags: ["Profile"],
      },
      response: {
        200: ProfileResponseSchema,
        401: ProfileFailureSchema,
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
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
  )
  //update profile
  .put(
    "",
    async ({ jwt, body, bearer, ip }) => {
      if (!bearer) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }

      const p = await jwt.verify(bearer);
      if (!p) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const user = await updateProfile({
        ...body,
        id: p?.id as string,
      });
      if (!user) {
        return {
          status: 500,
          message: "Profile not updated",
        };
      }
      return user;
    },
    {
      detail: {
        summary: "Update User profile",
        description:
          "Update User profile, requires Bearer token. Please get token from POST /auth/signin endpoint",
        tags: ["Profile"],
      },
      body: UpdateProfileSchema,
      response: {
        200: UpdateProfileResponseSchema,
        500: UpdateProfileFailureSchema,
        401: ProfileFailureSchema,
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
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
