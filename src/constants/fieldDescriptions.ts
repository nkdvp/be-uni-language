import { FieldDescription } from '../libs/querystring/models/fieldDescription';
import DataType from '../libs/querystring/models/literalDataTypes';

const newsFields: FieldDescription[] = [
  {
    field: 'title',
    dataType: DataType.STRING,
  },
  {
    field: 'tags',
    dataType: DataType.STRING,
  },
  {
    field: 'group',
    dataType: DataType.STRING,
  },

];

export { newsFields };
