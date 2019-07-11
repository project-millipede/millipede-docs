import './server';

import { setConfig } from 'next-server/dist/lib/runtime-config';

import config from './next.config';

console.log('setConfig', setConfig);

setConfig(config);
