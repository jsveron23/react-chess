import { curry } from 'ramda';
import { IS_DEV } from '~/presets';

/**
 * Debug only
 * @param  {Object?}  [options={}] - Options for debug output
 * @return {Function} curry
 */
const createDebug = (options = {}) => {
  const mergedOptions = {
    mode: 'log',
    ...options,
  };

  /**
   * Log a debug message in development
   * @param  {String} label - Log label
   * @param  {...*}   v - Values to log
   * @return {*} Passed values
   */
  return (label, ...v) => {
    if (IS_DEV) {
      // eslint-disable-next-line no-console
      console[mergedOptions.mode](label, ...v);
    }

    return v;
  };
};

const debug = curry(createDebug());

debug.err = curry(createDebug({ mode: 'error' }));
debug.inline = createDebug();

export { debug };
