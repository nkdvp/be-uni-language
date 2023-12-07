import { ExpressHandler, customResponse, customError } from '../interfaces/expressHandler';
import Logger from '../libs/logger';
import langs from '../constants/langs';

const logger = Logger.create('healthcheck.ts');
const apis: ExpressHandler[] = [
  {
    path: '/healthcheck/liveness',
    method: 'GET',
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        return customResponse(res, '', '', null);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
  {
    path: '/healthcheck/readiness',
    method: 'GET',
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        return customResponse(res, '', '', null);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
];
export default apis;
