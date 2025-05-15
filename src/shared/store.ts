import { combineSlices, configureStore, createSelector, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const rootReducer = combineSlices();

export const store = configureStore({
	reducer: rootReducer,

	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, null, UnknownAction>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
