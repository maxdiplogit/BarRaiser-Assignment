// React Hooks
import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';


const initialEmployeesListState = { employeesListValue: [] };


const employeesListSlice = createSlice({
    name: 'employeesList',
    initialState: initialEmployeesListState,
    reducers: {
        changeEmployeesList(currentState, action) {
            currentState.employeesListValue = action.payload;
        }
    }
});


const reducers = combineReducers({
    employeesList: employeesListSlice.reducer,
});


const persistConfig = {
    key: 'root',
    storage
};


const persistedReducer = persistReducer(persistConfig, reducers);


// Configuring Store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


// Extracting actions for dispatching to reducers, and exporting them so that components can dispatch actions to our reducers defined here
export const employeesListActions = employeesListSlice.actions;


export default store;