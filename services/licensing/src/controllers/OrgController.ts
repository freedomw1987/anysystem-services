import { Elysia } from "elysia";
import {
  create,
  CreateOrgSchema,
  CreateOrgResponseSchema,
  update,
  UpdateOrgSchema,
  UpdateOrgResponseSchema,
} from "../models/Organization";
import { FailureResponseSchema } from "../models/Failure";

export const OrgController = new Elysia({ prefix: "/org" })
  //create an organization
  .post(
    "/create",
    async ({ body }) => {
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
      },
      error({ set }) {
        set.status = 500;
        return {
          status: 500,
          message: "Internal server error",
        };
      },
    }
  )
  //update an organization
  .put(
    "/update",
    async ({ body }) => {
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
      },
      error({ set }) {
        set.status = 500;
        return {
          status: 500,
          message: "Internal server error",
        };
      },
    }
  );
