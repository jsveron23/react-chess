import { compose } from 'ramda';
import { EventListeners } from '~/services/network';
import configureStore from './configureStore';

export default compose(EventListeners.of, configureStore)();
