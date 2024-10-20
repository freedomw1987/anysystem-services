import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";
import {
  create,
  CreateOrgSchema,
  CreateOrgResponseSchema,
  update,
  UpdateOrgSchema,
  UpdateOrgResponseSchema,
  remove,
  DeleteOrgSchema,
  DeleteOrgResponseSchema,
  get,
  GetOrgSchema,
  GetOrgResponseSchema,
} from "../models/Organization";
import { isAuth } from "../models/Auth";
import {
  FailureResponseSchema,
  AuthFailureResponseSchema,
} from "../models/Failure";

export const OrgController = new Elysia({ prefix: "/org" })
  .use(bearer())
  //get an organization
  .get(
    "",
    async ({ query, bearer }) => {
      if (!isAuth(bearer)) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const org = await get(query);
      if (!org) {
        return {
          status: 500,
          message: "Organization not found",
        };
      }
      return org;
    },
    {
      detail: {
        summary: "Get an organization",
        tags: ["Organization"],
      },
      query: GetOrgSchema,
      response: {
        200: GetOrgResponseSchema,
        500: FailureResponseSchema,
        401: AuthFailureResponseSchema,
      },
      error({ set }) {
        set.status = 500;
        return {
          status: 500,
          message: "Internal server error",
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
  //create an organization
  .post(
    "",
    async ({ body, bearer }) => {
      if (!isAuth(bearer)) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const org = await create(body);
      if (!org) {
        return {
          status: 500,
          message: "Organization not created",
        };
      }
      return org;
    },
    {
      detail: {
        summary: "Create an organization",
        tags: ["Organization"],
      },
      body: CreateOrgSchema,
      response: {
        200: CreateOrgResponseSchema,
        500: FailureResponseSchema,
        401: AuthFailureResponseSchema,
      },
      error({ set }) {
        set.status = 500;
        return {
          status: 500,
          message: "Internal server error",
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
  //update an organization
  .put(
    "",
    async ({ body, bearer }) => {
      if (!isAuth(bearer)) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const org = await update(body);
      if (!org) {
        return {
          status: 500,
          message: "Organization not updated",
        };
      }
      return org;
    },
    {
      detail: {
        summary: "Update an organization",
        tags: ["Organization"],
      },
      body: UpdateOrgSchema,
      response: {
        200: UpdateOrgResponseSchema,
        500: FailureResponseSchema,
        401: AuthFailureResponseSchema,
      },
      error({ set }) {
        set.status = 500;
        return {
          status: 500,
          message: "Internal server error",
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
  ) //delete an organization
  .delete(
    "",
    async ({ body, bearer }) => {
      if (!isAuth(bearer)) {
        return {
          status: 401,
          message: "Unauthorized",
        };
      }
      const org = await remove(body);
      if (!org) {
        return {
          status: 500,
          message: "Organization not deleted",
        };
      }
      return org;
    },
    {
      detail: {
        summary: "Delete an organization",
        tags: ["Organization"],
      },
      body: DeleteOrgSchema,
      response: {
        200: DeleteOrgResponseSchema,
        500: FailureResponseSchema,
        401: AuthFailureResponseSchema,
      },
      error({ set }) {
        set.status = 500;
        return {
          status: 500,
          message: "Internal server error",
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
