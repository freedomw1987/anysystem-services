import { t, type Static } from "elysia";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const ProfileResponseSchema = t.Object({
  id: t.String({
    description: "User UUID",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  name: t.String({
    description: "User name",
    examples: ["John Doe"],
  }),
  email: t.String({
    description: "User email",
    format: "email",
    examples: ["pQXt9@example.com"],
  }),
  phone: t.String({
    description: "User phone",
    examples: ["123456789"],
  }),
});

export const ProfileFailureSchema = t.Object({
  status: t.Number({
    description: "Profile failed status",
    examples: [401],
  }),
  message: t.String({
    description: "Profile failed message",
    examples: ["Profile failed"],
  }),
});

type ProfileProps = {
  ip?: string;
  id: string;
};

type ProfileResponse = Static<typeof ProfileResponseSchema>;

export const profile = async ({
  id,
}: ProfileProps): Promise<ProfileResponse | undefined> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  } catch (error) {
    return;
  }
};
