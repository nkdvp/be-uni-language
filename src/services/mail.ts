import { ExpressHandler, customResponse, customError } from '../interfaces/expressHandler';
import Logger from '../libs/logger';
import langs from '../constants/langs';
import sendMailFn from '../libs/mail/send';
import { prefixApi } from '../constants/common';

const logger = Logger.create('mail.ts');
const apis: ExpressHandler[] = [
  // send an email
  {
    path: `${prefixApi}/mail`,
    method: 'POST',
    params: {
      $$strict: true,
      title: 'string',
      description: 'string',
      to: 'string',
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        const { to, title, description } = req.body;
        const result = await sendMailFn.sendBasicMail({ to, title, description });

        return customResponse(res, '', '', result);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
];
export default apis;
