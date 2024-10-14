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
});

type SigninProps = Static<typeof SigninSchema> & {
  ip?: string;
};

type SigninResponse = Static<typeof SigninResponseSchema>;

export const signin = async ({
  email,
  password,
  ip,
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
      };
    }
  } catch (error) {
    console.log(error);
  }
};
