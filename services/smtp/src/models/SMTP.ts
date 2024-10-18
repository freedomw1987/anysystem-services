import _ from "lodash";
import { t, Static } from "elysia";
import { PrismaClient } from "@prisma/client";
import { createTransport, TransportOptions, SendMailOptions } from "nodemailer";
const prisma = new PrismaClient();

if (process.env.SMTP_HOST === undefined) {
  throw new Error("SMTP_HOST is not defined");
}

const transporter = createTransport({
  host: process.env.SMTP_HOST as string,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} as TransportOptions);

export const DeliverResponseSchema = t.Object({
  total: t.Number({
    description: "The total number of emails",
    examples: [1],
  }),
  sent: t.Optional(
    t.Number({
      description: "The number of emails sent",
      examples: [1],
    })
  ),
  failed: t.Optional(
    t.Number({
      description: "The number of emails failed",
      examples: [0],
    })
  ),
});

type DeliverResponse = Static<typeof DeliverResponseSchema>;

export const deliver = async (): Promise<DeliverResponse | undefined> => {
  try {
    const emails = await prisma.email.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        attachments: true,
      },
      take: 60,
    });
    if (!emails || emails.length === 0) {
      return {
        total: 0,
        sent: 0,
        failed: 0,
      };
    }

    const ps = _.map(emails, (email) => {
      if (!email?.to) return false;
      const mail: SendMailOptions = {
        from: email.from,
        to: (email.to as string[])?.join(", "),
        cc: (email.cc as string[])?.join(", "),
        bcc: (email.bcc as string[])?.join(", "),
        subject: email.subject,
        text: email.isHtml === false ? email.content : undefined,
        html: email.isHtml === true ? email.content : undefined,
        attachments: email?.attachments,
      };
      return transporter.sendMail(mail);
    });

    const ifs = await Promise.all(ps);

    const ps2 = _.map(emails, (email, i) => {
      if (!ifs?.[i]) {
        return prisma.email.update({
          where: {
            id: email.id,
          },
          data: {
            status: "FAILED",
          },
        });
      }
      return prisma.email.update({
        where: {
          id: email.id,
        },
        data: {
          status: "SENT",
        },
      });
    });

    const results = await Promise.all(ps2);

    return {
      total: emails.length || 0,
      sent: _.filter(results, (r) => r.status === "SENT")?.length || 0,
      failed: _.filter(results, (r) => r.status === "FAILED")?.length || 0,
    };
  } catch (error) {
    console.log(error);
  }
};
