import React, { createContext, useReducer, useState } from 'react';
import authInitialStates from './init/authInitialStates';
import auth from './reducers/auth';
import { Auth } from 'aws-amplify';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {

    const [s, setState] = useState({});

    Auth.currentAuthenticatedUser({
        bypassCache: true
    })
    .then((user) => {
        localStorage.setItem('isAuth', true);
        authInitialStates.auth.data = user;
        authInitialStates.auth.isAuth = true;
        setState(authInitialStates);
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