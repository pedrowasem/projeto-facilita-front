import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './modules/rootReducer';

const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export type AppDispatch = typeof store.dispatch;
