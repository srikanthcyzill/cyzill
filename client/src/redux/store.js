import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import adminReducer from './admin/adminSlice.js'
import { persistReducer, persistStore } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'
import propertyReducer from './PropertyReducer.js'
import { api } from '../components/admin/state/api.js';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    properties: propertyReducer,
    [api.reducerPath]: api.reducer,
})

const persistConfig = {
    key: 'root',
    storage: localStorage,
    whitelist: ['user', 'admin', 'properties']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
})

setupListeners(store.dispatch);

export const persistor = persistStore(store);
