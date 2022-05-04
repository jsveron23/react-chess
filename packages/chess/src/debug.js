import { compose, keys, forEach, identity, apply } from 'ramda';

function debug(options) {
  options = {
    debug: process.env.NODE_ENV === 'development',
    group: false,
    collapsed: false,
    ...options,
  };

  if (!debug) {
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

const _debug = debug();

_debug.o = debug;
_debug.grp = (group = {}, options = {}) => {
  const groupDebug = debug({ group: true, ...options });

  compose(
    forEach((key) => groupDebug(group[key], key)),
    keys
  )(group);
};

export default _debug;
