import { ExpressHandler, ProxyExpressHandler } from '../interfaces/expressHandler';
import healthCheckApis from './healthcheck';
import loggerCfgApis from './loggerCfg';
import demoProxy from './proxy/demo';
import demo2Proxy from './proxy/demo2';
const apis: (ExpressHandler | ProxyExpressHandler)[] = [
  ...healthCheckApis,
  ...loggerCfgApis,
  ...demoProxy,
  ...demo2Proxy,
];
export default apis;
