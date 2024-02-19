const READ_MAIL_CONFIG = {
  user: process.env.EMAIL,
  password: process.env.PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { servername: 'mail.google.com' },
};
const SEND_MAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
export { READ_MAIL_CONFIG, SEND_MAIL_CONFIG };
