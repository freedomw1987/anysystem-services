import { t, type Static } from "elysia";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "./SMTP";

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
  token: string;
};

type ForgotPasswordResponse = Static<typeof ForgotPasswordResponseSchema>;

export const forgotPassword = async ({
  email,
  ip,
  token,
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
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      },
    });

    await prisma.log.create({
      data: {
        userId: user.id,
        ip,
        action: "FORGOT_PASSWORD",
      },
    });

    await sendEmail({
      from: "info@marstree.ltd",
      to: [user.email],
      subject: "Forgot password",
      content: `Hi ${user.name}, please use this link to reset your password: ${process.env.APP_URL}/reset-password?id=${user.id}&token=${token}`,
      isHtml: false,
    });

    return {
      id: user.id,
    };
  } catch (error) {
    return;
  }
};
