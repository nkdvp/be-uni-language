export const SearchPagingMongoValidator = {
  $$strict: true,
  queryString: { type: 'string', default: '' },
  pagingAndSorting: {
    type: 'object',
    default: { page: 1, perPage: 10, sort: { _id: -1 } },
    props: {
      page: 'number|default:1',
      perPage: 'number|default: 10',
      sort: {
        type: 'object',
        default: { _id: -1 },
      },
    },
  },
};

export const SearchPagingMySqlValidator = {
  $$strict: true,
  queryString: { type: 'string', default: '' },
  pagingAndSorting: {
    type: 'object',
    default: { page: 1, perPage: 10, sort: { id: -1 } },
    props: {
      page: 'number|default:1',
      perPage: 'number|default: 10',
      sort: {
        type: 'object',
        default: { id: -1 },
      },
    },
  },
};
