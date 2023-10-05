import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import srcCodeReducer from './reducers/srcCodeReducer'; // Create your own reducer
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
        srcCodeData: srcCodeReducer,
    },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);