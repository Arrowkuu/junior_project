import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom'
};
export default config;