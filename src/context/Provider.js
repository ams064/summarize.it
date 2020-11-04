import React, { createContext, useReducer } from 'react';
import authInitialStates from './init/authInitialStates';
import auth from './reducers/auth';


export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(auth, authInitialStates);

    return (
        <AppContext.Provider value={{authState, authDispatch}} >
            {children}
        </AppContext.Provider>
    )
};