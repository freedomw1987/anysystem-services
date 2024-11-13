import { t, type Static } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UpdateProfileSchema = t.Object({
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
    description: "User phone number",
    examples: ["+853-66297530"],
  }),
});

export const UpdateProfileResponseSchema = t.Object({
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
    description: "User phone number",
    examples: ["+853-66297530"],
  }),
});

export const UpdateProfileFailureSchema = t.Object({
  status: t.Number({
    description: "Update profile failed status",
    examples: [401],
  }),
  message: t.String({
    description: "Update profile failed message",
    examples: ["Update profile failed"],
  }),
});

type UpdateProfileProps = Static<typeof UpdateProfileSchema> & {
  id: string;
  ip?: string;
};
type UpdateProfileResponse = Static<typeof UpdateProfileResponseSchema>;

export const updateProfile = async (
  input: UpdateProfileProps
): Promise<UpdateProfileResponse | undefined> => {
  try {
    const { id, ...rest } = input;
    let user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return;
    }
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...rest,
      },
    });
    await prisma.log.create({
      data: {
        userId: user.id,
        ip: input.ip,
        action: "update-profile",
      },
    });
    return {
      id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};
