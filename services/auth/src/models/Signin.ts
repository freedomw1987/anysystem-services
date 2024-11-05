import { t, type Static } from "elysia";
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export const SigninSchema = t.Object({
  email: t.String({
    description: "User email",
    format: "email",
    examples: ["pQXt9@example.com"],
  }),
  password: t.String({
    description: "User password",
    examples: ["123456789"],
  }),
});

export const SigninResponseSchema = t.Object({
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
  loginAt: t.Date({
    description: "User login time",
    examples: ["2022-01-01T00:00:00.000Z"],
  }),
  token: t.String({
    description: "User token",
    examples: [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    ],
  }),
  expiresAt: t.Date({
    description: "User token expiration time",
    examples: ["2022-01-01T00:00:00.000Z"],
  }),
});

export const SigninFailureSchema = t.Object({
  status: t.Number({
    description: "Signin failed status",
    examples: [401],
  }),
  message: t.String({
    description: "Signin failed message",
    examples: ["Signin failed"],
  }),
});

type SigninProps = Static<typeof SigninSchema> & {
  ip?: string;
  token: string;
};

type SigninResponse = Static<typeof SigninResponseSchema>;

export const signin = async ({
  email,
  password,
  ip,
  token,
}: SigninProps): Promise<SigninResponse | undefined> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        name: true,
        email: true,
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
        token,
        expiresAt,
      },
    });
    const log = await prisma.log.create({
      data: {
        ip,
        userId: user.id,
        action: "SIGNIN",
      },
    });
    if (await Bun.password.verify(password, user?.password)) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        loginAt: log.createdAt,
        token,
        expiresAt,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
