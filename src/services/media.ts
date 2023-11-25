import { ExpressHandler, nextpayResponse, nextpayError } from '../interfaces/expressHandler';
import Logger from '../libs/logger';
import langs from '../constants/langs';

const logger = Logger.create('media.ts');
const apis: ExpressHandler[] = [
  // get a media
  {
    path: '/media/:path',
    method: 'GET',
    params: {
      $$strict: true,
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        return nextpayResponse(res, '', '', null);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return nextpayError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
  // create a media and return link
  {
    path: '/media',
    method: 'POST',
    params: {
      $$strict: true,
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        return nextpayResponse(res, '', '', null);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return nextpayError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
];
export default apis;
