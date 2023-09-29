import { configureStore } from '@reduxjs/toolkit'
import persistedReducer from '../reducers/Index'
import { persistStore } from 'redux-persist'

const Store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(Store);
export default Store;
