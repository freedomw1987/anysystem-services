import { t, type Static } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ForgotPasswordSchema = t.Object({
  email: t.String({
    description: "User email",
    format: "email",
    examples: ["pQXt9@example.com"],
  }),
});

export const ForgotPasswordResponseSchema = t.Object({
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
});

export const ForgotPasswordFailureSchema = t.Object({
  status: t.Number({
    description: "Forgot password failed status",
    examples: [401],
  }),
  message: t.String({
    description: "Forgot password failed message",
    examples: ["Forgot password failed"],
  }),
});

type ForgotPasswordProps = Static<typeof ForgotPasswordSchema> & {
  ip?: string;
};

type ForgotPasswordResponse = Static<typeof ForgotPasswordResponseSchema> & {
  name: string;
  email: string;
};

export const forgotPassword = async ({
  email,
  ip,
}: ForgotPasswordProps): Promise<ForgotPasswordResponse | undefined> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return;
    }

    await prisma.log.create({
      data: {
        userId: user.id,
        ip,
        action: "FORGOT_PASSWORD",
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: "",
    };
  } catch (error) {
    return;
  }
};
