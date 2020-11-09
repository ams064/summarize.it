import React, { createContext, useReducer } from 'react';
import authInitialStates from './init/authInitialStates';
import auth from './reducers/auth';
import { Auth } from 'aws-amplify';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    Auth.currentAuthenticatedUser({
        bypassCache: false
    })
    .then((user) => {
        localStorage.setItem('isAuth', true);
        authInitialStates.data = user;
        authInitialStates.isAuth = true;
    })
    .catch((err) => {
        localStorage.setItem('isAuth', false);
    });

    const [authState, authDispatch] = useReducer(auth, authInitialStates);

    return (
        <AppContext.Provider value={{authState, authDispatch}} >
            {children}
        </AppContext.Provider>
    )
};