import { compose, keys, forEach, identity, apply } from 'ramda';

function createDebug(options) {
  options = {
    debug: process.env.NODE_ENV === 'development',
    group: false,
    collapsed: false,
    ...options,
  };

  if (!options.debug) {
    return identity;
  }

  return (items = [], label = '') => {
    if (options.group) {
      console[options.collapsed ? 'groupCollapsed' : 'group'](label);
    }

    forEach(apply(console.log), items);

    if (options.group) {
      console.groupEnd();
    }
  };
}

const debug = createDebug();

debug.o = createDebug;
debug.grp = (group = {}, options = {}) => {
  const groupDebug = createDebug({ group: true, ...options });

  compose(
    forEach((key) => groupDebug(group[key], key)),
    keys
  )(group);
};

export default debug;
