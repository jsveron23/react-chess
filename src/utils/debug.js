import { curry } from 'ramda';
import { IS_DEV } from '~/presets';

/**
 * Debug only
 * @param  {Object?}  [options={}]
 * @return {Function} curry
 */
function createDebug(options = {}) {
  options = {
    mode: 'log',
    ...options,
  };

  /**
   * @param  {String} label
   * @param  {...*}   v
   * @return {*}
   */
  return (label, ...v) => {
    if (IS_DEV) {
      console[options.mode](label, ...v);
    }

    return v;
  };
}

const debug = curry(createDebug());

debug.err = curry(createDebug({ mode: 'error' }));
debug.inline = createDebug();

export default debug;
