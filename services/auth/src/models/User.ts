import { t } from "elysia";

export const UserDTO = t.Object({
  id: t.Number({
    description: "User ID",
    examples: [1],
  }),
  uuid: t.String({
    description: "User UUID",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  email: t.String({
    description: "User email",
    format: "email",
    examples: ["pQXt9@example.com"],
  }),
  name: t.Optional(
    t.String({
      description: "User name",
      examples: ["John Doe"],
    })
  ),
  phoneNumber: t.Optional(
    t.String({
      description: "User phone number",
      examples: ["+853-66297530"],
    })
  ),
  address: t.Optional(
    t.String({
      description: "User address",
      examples: ["123 Main Street, Anytown USA 12345"],
    })
  ),
  status: t.KeyOf(
    t.Object({
      ACTIVE: t.Number(),
      INACTIVE: t.Number(),
    }),
    {
      description: "User status. it will be ACTIVE or INACTIVE",
      examples: ["ACTIVE", "INACTIVE"],
    }
  ),
  createdAt: t.Number({
    description: "User creation date in unix timestamp",
    examples: [1600000000],
  }),
  updatedAt: t.Number({
    description: "User update date in unix timestamp",
    examples: [1600000000],
  }),
});
