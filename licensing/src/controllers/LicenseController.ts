import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";
import {
  create,
  CreateLicenseSchema,
  CreateLicenseResponseSchema,
  check,
  CheckLicenseSchema,
  CheckLicenseResponseSchema,
} from "../models/License";
import { isAuth } from "../models/Auth";
import {
  FailureResponseSchema,
  AuthFailureResponseSchema,
} from "../models/Failure";

export const LicenseController = new Elysia({ prefix: "/license" })
  .use(bearer())
  //create a license
  .post(
    "",
    async ({ body, bearer }) => {
      if (!isAuth(bearer)) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const license = await create(body);
      if (!license) {
        return {
          status: 500,
          message: "License not created",
        };
      }
      return license;
    },
    {
      detail: {
        summary: "Create a license",
        tags: ["License"],
      },
      body: CreateLicenseSchema,
      response: {
        200: CreateLicenseResponseSchema,
        500: FailureResponseSchema,
        401: AuthFailureResponseSchema,
      },
      error({ set }) {
        set.status = 500;
        return {
          status: 500,
          message: "License not created",
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
  )
  //check a license
  .get(
    "/check",
    async ({ query, bearer }) => {
      if (!isAuth(bearer)) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const license = await check(query);
      if (!license) {
        return {
          status: 500,
          message: "License not founded",
        };
      }
      return license;
    },
    {
      detail: {
        summary: "Check a license",
        tags: ["License"],
      },
      query: CheckLicenseSchema,
      response: {
        200: CheckLicenseResponseSchema,
        500: FailureResponseSchema,
        401: AuthFailureResponseSchema,
      },
      error({ set }) {
        set.status = 500;
        return {
          status: 500,
          message: "License not founded",
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
