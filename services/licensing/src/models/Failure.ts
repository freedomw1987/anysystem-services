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
