import { ExpressHandler, ProxyExpressHandler } from '../interfaces/expressHandler';
import healthCheckApis from './healthcheck';
import loggerCfgApis from './loggerCfg';
import demoProxy from './proxy/demo';
import demo2Proxy from './proxy/demo2';
import newsApis from './news';
import mediaApis from './media';
import s3UploadApis from './s3Upload';

import testApis from './test';

const apis: (ExpressHandler | ProxyExpressHandler)[] = [
  ...healthCheckApis,
  ...loggerCfgApis,
  ...demoProxy,
  ...demo2Proxy,
  ...newsApis,
  ...mediaApis,
  ...s3UploadApis,
  ...testApis,
];
export default apis;
