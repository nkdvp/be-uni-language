import { ExpressHandler, customResponse, customError } from '../interfaces/expressHandler';
import Logger from '../libs/logger';
import langs from '../constants/langs';
import newsModel from '../models/news.model';

const logger = Logger.create('news.ts');
const apis: ExpressHandler[] = [
  // search for news
  {
    path: '/news/search',
    method: 'POST',
    params: {
      $$strict: true,
    },
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
  // create a news
  {
    path: '/news',
    method: 'POST',
    params: {
      $$strict: true,
      title: 'string',
      description: 'string',
      group: 'string',
      tags: {
        type: 'array',
        items: 'string',
      },
      optional: true,
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        const { title, description, group, tags } = req.body;
        const result = newsModel.create({
          title,
          description,
          group: group || 'other',
          tags,
        });

        return customResponse(res, '', '', result);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
  // update a news
  {
    path: '/news/:id',
    method: 'PATCH',
    params: {
      $$strict: true,
      title: 'string|optional',
      description: 'string|optional',
      group: 'string|optional',
      tags: {
        type: 'array',
        items: 'string',
        optional: true,
      },
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        const id = req.params.id;
        if (!id) return customError(res, 'id invalid', langs.BAD_REQUEST, null, 400);
        const { title, description, group, tags } = req.body;
        const result = newsModel.findOneAndUpdate({
          title,
          description,
          group: group || 'other',
          tags,
        });

        return customResponse(res, '', '', result);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
];
export default apis;
