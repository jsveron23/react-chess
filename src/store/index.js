import { compose } from 'ramda';
import configureStore from './configureStore';
import { networkSupport } from '../networkSupport';

export default compose(networkSupport, configureStore)();
