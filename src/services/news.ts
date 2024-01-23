import { ExpressHandler, customResponse, customError } from '../interfaces/expressHandler';
import Logger from '../libs/logger';
import langs from '../constants/langs';
import newsModel from '../models/news.model';
import { SearchPagingMongoValidator } from '../DTOs/common';
import { toMongoCriteria } from '../libs/querystring';
import { newsFields } from '../constants/fieldDescriptions';

const logger = Logger.create('news.ts');
const apis: ExpressHandler[] = [
  // search for news
  {
    path: '/news/search',
    method: 'POST',
    params: SearchPagingMongoValidator,
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        const { queryString } = req.body;
        const { page, perPage, sort } = req.body.pagingAndSorting;
        if (!sort._id) sort._id = -1;
        const filter = toMongoCriteria(queryString, newsFields);
        const finalFilter = JSON.parse(filter);
        const result = await newsModel
          .find(finalFilter)
          .skip((page - 1) * perPage)
          .limit(perPage)
          .sort(sort)
          .lean();

        return customResponse(res, '', '', result);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err.message);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
  // a news
  {
    path: '/news/:id',
    method: 'GET',
    params: {
      $$strict: false,
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        const id = req.params.id;
        const result = await newsModel.findById(id);

        return customResponse(res, '', '', result);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err.message);

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
      titleVn: 'string',
      descriptionVn: 'string',
      titleEn: 'string|optional',
      descriptionEn: 'string|optional',
      avatar: 'string|optional',
      group: {
        type: 'string',
        default: 'general',
      },
      tags: {
        type: 'array',
        items: 'string',
        default: [],
      },
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        const { titleVn, avatar, descriptionVn, titleEn, descriptionEn, group, tags } = req.body;
        // const test = await newsModel.findOne().lean(); return customResponse(res, '', '', test);
        const result = await newsModel.create({
          titleVn,
          descriptionVn,
          titleEn,
          descriptionEn,
          avatar,
          group: group,
          tags,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return customResponse(res, '', '', result);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err.message);

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
      titleVn: 'string|optional',
      descriptionVn: 'string|optional',
      titleEn: 'string|optional',
      descriptionEn: 'string|optional',
      avatar: 'string|optional',
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
        const { titleVn, avatar, descriptionVn, titleEn, descriptionEn, group, tags } = req.body;
        const result = newsModel.findOneAndUpdate({
          titleVn,
          descriptionVn,
          titleEn,
          descriptionEn,
          avatar,
          group,
          tags,
          updatedAt: new Date(),
        });

        return customResponse(res, '', '', result);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err.message);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
];
export default apis;
