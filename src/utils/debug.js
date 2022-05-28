import { curry } from 'ramda';

/**
 * Debug only
 * @param  {Object}   [options={}]
 * @return {Function} curry
 */
function createDebug(options = {}) {
  options = {
    mode: 'log',
    ...options,
  };

  return (label, v) => {
    console[options.mode](label, v || '');

    return v;
  };
}

const debug = curry(createDebug());

debug.err = curry(createDebug({ mode: 'error' }));
debug.inline = createDebug();

export default debug;
