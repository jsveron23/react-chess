import { curry } from 'ramda';

/**
 * Debug only
 * @param  {Object}   [options={}]
 * @return {Function} curry
 */
function createDebug(options = {}) {
  const mode = options.mode || 'log';

  return (label, v) => {
    console[mode](label, v || '');

    return v;
  };
}

const debug = curry(createDebug());

debug.err = curry(createDebug({ mode: 'error' }));
debug.inline = createDebug();

export default debug;
