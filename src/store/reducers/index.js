// Reducers have been migrated to slices. This file is kept for compatibility.
// The root reducer is now configured directly in configure-store.js.
export { default as generalReducer } from '../slices/general';
export { default as ingameReducer } from '../slices/ingame';
export { default as aiReducer } from '../slices/ai';
export { default as networkReducer } from '../slices/network';
export { default as animateReducer } from '../slices/animate';
