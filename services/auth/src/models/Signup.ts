import { PrismaClient } from "@prisma/client";
import { t, type Static } from "elysia";

const prisma = new PrismaClient();

export const SignupSchema = t.Object({
  email: t.String({
    description: "User email",
    format: "email",
    examples: ["pQXt9@example.com"],
  }),
  name: t.String({
    description: "User name",
    examples: ["John Doe"],
  }),
  phone: t.String({
    description: "User phone number",
    examples: ["+853-66297530"],
  }),
  password: t.String({
    description: "User password",
    minLength: 8,
    examples: ["123456789"],
  }),
});

export const SignupResponseSchema = t.Object({
  id: t.String({
    description: "User UUID",
    examples: ["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"],
  }),
});

export const SignupFailureSchema = t.Object({
  status: t.Number({
    description: "Signup failed status",
    examples: [401],
  }),
  message: t.String({
    description: "Signup failed message",
    examples: ["Signup failed"],
  }),
});

type SignupResponse = Static<typeof SignupResponseSchema>;

type SignupProps = Static<typeof SignupSchema> & {
  ip?: string;
};

export const signup = async (
  input: SignupProps
): Promise<SignupResponse | undefined> => {
  const { ip, ...rest } = input;
  try {
    const user = await prisma.user.create({
      data: {
        ...rest,
        password: await Bun.password.hash(input.password),
        role: "USER",
      },
    });

    if (user?.id) {
      await prisma.log.create({
        data: {
          ip,
          userId: user.id,
          action: "SIGNUP",
        },
      });
    }

    return {
      id: user?.id,
    };
  } catch (error) {
    console.log(error);
  }
};
