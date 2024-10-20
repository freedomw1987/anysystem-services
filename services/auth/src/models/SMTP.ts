import {
  createTransport,
  TransportOptions,
  SendMailOptions,
  SentMessageInfo,
} from "nodemailer";

const transporter = createTransport({
  pool: true,
  host: process.env.SMTP_HOST as string,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} as TransportOptions);

export type SendEmailProps = {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  content: string;
  isHtml?: boolean;
  attachments?: Attachment[];
};

export type Attachment = {
  filename: string;
  path: string;
};

export const sendEmail = async (
  email: SendEmailProps
): Promise<SentMessageInfo | undefined> => {
  try {
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
    return await transporter.sendMail(mail);
  } catch (error) {
    console.log(error);
  }
};
