import { t, type Static } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ResetPasswordSchema = t.Object({
  password: t.String({
    description: "User password",
    examples: ["123456789"],
  }),
});

export const ResetPasswordResponseSchema = t.Object({
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
});

export const ResetPasswordFailureSchema = t.Object({
  status: t.Number({
    description: "Reset password failed status",
    examples: [401],
  }),
  message: t.String({
    description: "Reset password failed message",
    examples: ["Reset password failed"],
  }),
});

type ResetPasswordProps = Static<typeof ResetPasswordSchema> & {
  id: string;
  ip?: string;
};

type ResetPasswordResponse = Static<typeof ResetPasswordResponseSchema>;

export const resetPassword = async ({
  id,
  password,
  ip,
}: ResetPasswordProps): Promise<ResetPasswordResponse | undefined> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      return;
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await Bun.password.hash(password),
      },
    });

    await prisma.log.create({
      data: {
        ip,
        userId: user.id,
        action: "RESET_PASSWORD",
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};
