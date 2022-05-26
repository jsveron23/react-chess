import { curry } from 'ramda';

function createDebug(options = {}) {
  const mode = options.mode || 'log';

  return (label, v) => {
    console[mode](label, v);

    return v;
  };
}

const debug = curry(createDebug());

debug.err = curry(createDebug({ mode: 'error' }));
debug.inline = createDebug();

export default debug;
