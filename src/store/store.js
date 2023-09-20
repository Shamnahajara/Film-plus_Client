import {configureStore} from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import {user} from './slice/user'
import { Admin } from "./slice/admin";

const userPersistConfig = {key:"userAuth",storage,version:1}
const adminPersistConfig = {key:"adminAuth",storage,version:1}

const userPersistReducer = persistReducer(userPersistConfig,user.reducer)
const adminPersistReducer = persistReducer(adminPersistConfig,Admin.reducer)

export const Store = configureStore({
    reducer: {
        User: userPersistReducer,
        Admin:adminPersistReducer
        
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});

export const persistor = persistStore(Store);