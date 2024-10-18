import { Elysia } from "elysia";
import { ip } from "elysia-ip";
import cron from "@elysiajs/cron";

import {
  SendEmailSchema,
  SendEmailResponseSchema,
  SendEmailFailureSchema,
  send,
} from "../models/Send";

import { DeliverResponseSchema, deliver } from "../models/SMTP";

export const EmailController = new Elysia({ prefix: "/email" })
  .use(ip())
  .post(
    "/send",
    async ({ body }) => {
      const email = await send({ ...body });
      if (!email) {
        return {
          status: 500,
          message: "Email not sent",
        };
      }
      return email;
    },
    {
      detail: {
        summary: "Send an email",
        tags: ["Email"],
      },
      body: SendEmailSchema,
      response: {
        200: SendEmailResponseSchema,
        500: SendEmailFailureSchema,
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
  .post(
    "/deliver",
    async () => {
      const result = await deliver();
      if (!result) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }
      return result;
    },
    {
      detail: {
        summary: "Send an email",
        tags: ["Email"],
      },
      response: {
        200: DeliverResponseSchema,
        500: SendEmailFailureSchema,
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
  .use(
    cron({
      name: "email_deliver",
      pattern: "*/20 * * * * *",
      run: async () => {
        console.log(
          new Date().toISOString(),
          "Running cron job: email_deliver"
        );
        return await deliver();
      },
    })
  );
