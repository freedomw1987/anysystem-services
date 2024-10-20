import { t } from "elysia";

export const FailureResponseSchema = t.Object({
  status: t.Number({
    default: 500,
    examples: [500],
  }),
  message: t.String({
    default: "Internal server error",
  }),
});

export const AuthFailureResponseSchema = t.Object({
  status: t.Number({
    default: 401,
    examples: [401],
  }),
  message: t.String({
    default: "Unauthorized",
  }),
});
