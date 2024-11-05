import { t, type Static } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ResetPasswordSchema = t.Object({
  id: t.String({
    description: "User UUID",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
  token: t.String({
    description: "User token",
    examples: [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    ],
  }),
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
  token: t.String({
    description: "User renew token",
    examples: [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    ],
  }),
  expiresAt: t.Date({
    description: "User token expiration time",
    examples: ["2022-01-01T00:00:00.000Z"],
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
  ip?: string;
  renewToken: string;
};

type ResetPasswordResponse = Static<typeof ResetPasswordResponseSchema>;

export const resetPassword = async ({
  id,
  token,
  renewToken,
  password,
  ip,
}: ResetPasswordProps): Promise<ResetPasswordResponse | undefined> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
        token,
      },
    });
    if (!user) {
      return;
    }
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await Bun.password.hash(password),
        token: renewToken,
        expiresAt,
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
      token: renewToken,
      expiresAt,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};
