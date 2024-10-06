import { t } from "elysia";

export const SignupDTO = t.Object({
  email: t.String({
    description: "User email",
    format: "email",
    examples: ["pQXt9@example.com"],
  }),
  password: t.String({
    description: "User password",
    minLength: 8,
    examples: ["123456789"],
  }),
});

export const LoginRequestDTO = t.Object({
  email: t.String({
    description: "User email",
    format: "email",
    examples: ["pQXt9@example.com"],
  }),
  password: t.String({
    description: "User password",
    examples: ["123456"],
  }),
});

export const LoginTokenDTO = t.Object({
  uuid: t.String({
    description: "User UUID",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  token: t.String({
    description: "Login system token",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  createdAt: t.Number({
    description: "Login system creation date in unix timestamp",
    examples: [1600000000],
  }),
  expiredAt: t.Number({
    description: "Login system expire date in unix timestamp (30 days)",
    examples: [1600000000 + 86400000 * 30],
  }),
  updatedAt: t.Number({
    description: "Login system update date in unix timestamp",
    examples: [1600000000],
  }),
});

export const LoginFailureDTO = t.Object({
  status: t.Number({
    description: "Login failed status",
    examples: [401],
  }),
  message: t.String({
    description: "Login failed message",
    examples: ["Login failed"],
  }),
});
