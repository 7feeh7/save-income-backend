import { Transporter } from "nodemailer"
import { IMailProvider, IMessage } from "@/providers/IMailProvider"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import SMTPTransport from "nodemailer/lib/smtp-transport"
dotenv.config()

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>

  constructor() {
    const transportOptions: SMTPTransport.Options = {
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT!),
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
      },
    }

    this.transporter = nodemailer.createTransport(transportOptions)
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }
}
