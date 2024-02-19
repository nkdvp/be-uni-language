import nodeMailer from 'nodemailer';
import Logger from '../logger';

const logger = Logger.create('NODE_MAILER_LIB');

const host = process.env.SMTP_HOST;
const username = process.env.EMAIL;
const password = process.env.PASSWORD;
const senderEmail = process.env.EMAIL;
const senderName = 'Bot uni language';

const smtpConnection = nodeMailer.createTransport({
  host,
  pool: true,
  port: 465,
  secure: true,
  auth: {
    user: username,
    pass: password,
  },
});

interface IInfo {
  to: string;
  title: string;
  description: string;
}

const sendMailFn = {
  verify() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    smtpConnection.verify((err: any, success) => {
      if (err) {
        logger.info("Server isn't ready to send mail", err);
      } else {
        logger.info('Server is ready to send mail');
      }
    });
  },
  async sendBasicMail(info: IInfo) {
    const content = {
      from: {
        name: senderName,
        address: senderEmail,
      },
      to: info.to,
      subject: info.title,
      html: info.description,
    };
    try {
      await smtpConnection.sendMail(content);

      return true;
    } catch (e) {
      logger.error('Error occurs: ', e);

      return false;
    }
  },
};

export default sendMailFn;
