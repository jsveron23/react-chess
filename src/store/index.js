import configureStore from './configureStore'

const store = configureStore()
store.withState = configureStore

export default store
