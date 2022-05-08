import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartSlice from "./cartSlice";

//COMBINING ALL REDUCERS

const rootReducer = combineReducers({
	cart: cartSlice,
});

const makeStore = ({ isServer }) => {
	if (isServer) {
		//If it's on server side, create a store
		return configureStore({
			reducer: rootReducer,
		});
	} else {
		//If it's on client side, create a store which will persist
		// const storage = storage.default

		const persistConfig = {
			key: "root",
			version: 1,
			blacklist: [],
			storage,
		};

		const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

		const store = configureStore({
			reducer: persistedReducer,
			middleware: getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
				},
			}),
		});

		store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

		return store;
	}
};
// Export the wrapper & wrap the pages/_app.js with this wrapper only

export const wrapper = createWrapper(makeStore, { debug: true });
