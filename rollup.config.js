import defaultConfig from './rollup.default.config.js';
import debugConfig from './rollup.debug.config.js';

export default (commandLineArgs) => {
  if (commandLineArgs.configDebug) {
    const configDebugExtended = Object.assign({}, defaultConfig, {
      output: Object.assign({}, defaultConfig.output, debugConfig.output),
    });

    return configDebugExtended;
  }

  return defaultConfig;
};
