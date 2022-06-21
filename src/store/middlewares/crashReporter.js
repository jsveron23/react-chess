import { debug } from '~/utils';

const crashReporter = (/* store */) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    debug.err('caught an exception!', err);

    throw err;
  }
};

export default crashReporter;
