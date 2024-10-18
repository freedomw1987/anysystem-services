import { t, Static } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const SendEmailSchema = t.Object({
  from: t.String({
    description: "Email address of the sender",
    format: "email",
    examples: ["qGkK6@example.com"],
  }),
  fromName: t.Optional(
    t.String({
      description: "Name of the sender",
      examples: ["John Doe"],
    })
  ),
  to: t.Array(
    t.String({
      format: "email",
      examples: ["qGkK1@example.com"],
    }),
    {
      description: "The recipients of the email",
    }
  ),
  cc: t.Optional(
    t.Array(
      t.String({
        format: "email",
      }),
      {
        description: "Email address of the recipient (cc)",
      }
    )
  ),
  bcc: t.Optional(
    t.Array(
      t.String({
        format: "email",
      }),
      {
        description: "Email address of the recipient (cc)",
      }
    )
  ),
  subject: t.String({
    description: "The subject of the email",
    examples: ["Hello, World!"],
  }),
  content: t.String({
    description: "The content of the email",
    examples: ["Hello, World! How are you?"],
  }),
  isHtml: t.Boolean({
    description: "is the content html?",
    default: false,
    examples: [false, true],
  }),
  attachments: t.Optional(
    t.Array(
      t.Object({
        filename: t.String({
          description: "The name of the attachment",
        }),
        path: t.String({
          description: "The content of the attachment",
        }),
      }),
      {
        description: "The attachments of the email",
      }
    )
  ),
});

export const SendEmailResponseSchema = t.Object({
  id: t.String({
    description: "The uuid of the email",
    examples: ["d6f9f9f9-6f9f-9f9f-9f9f-9f9f9f9f9f9f"],
  }),
  status: t.String({
    description: "The status of the email",
    examples: ["SENT", "FAILED", "PENDING"],
  }),
  createdAt: t.Date({
    description: "The creation date of the email",
    examples: ["2022-01-01T00:00:00.000Z"],
  }),
});

export const SendEmailFailureSchema = t.Object({
  status: t.Number({
    description: "The status of the email",
    examples: ["SENT", "FAILED", "PENDING"],
  }),
  message: t.String({
    description: "The message of the email",
    examples: ["Email not sent"],
  }),
});

type SendEmailProps = Static<typeof SendEmailSchema>;
type SendEmailResponse = Static<typeof SendEmailResponseSchema>;

export const send = async ({
  from,
  fromName,
  to,
  subject,
  content,
  isHtml = false,
  cc,
  bcc,
  attachments,
}: SendEmailProps): Promise<SendEmailResponse | undefined> => {
  try {
    const email = await prisma.email.create({
      data: {
        from,
        fromName,
        to,
        subject,
        content,
        isHtml,
        cc,
        bcc,
        ...(attachments &&
          attachments.length > 0 && {
            attachments: {
              create: attachments,
            },
          }),
      },
    });

    return {
      id: email.id,
      status: email.status,
      createdAt: email.createdAt,
    };
  } catch (error) {
    console.log(error);
  }
};
