import { compose } from 'ramda';
import { EventListeners } from '~/services/network';
import { configureStore } from './configure-store';

const store = compose(EventListeners.of, configureStore)();

export { store };
