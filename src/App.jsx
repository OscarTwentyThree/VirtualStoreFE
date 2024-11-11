
import { useReducer, useEffect } from 'react';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';
import { AppRouter } from './router/AppRouter';

const init = () => {
    return (
        JSON.parse(localStorage.getItem('data')) || {
            isAuthenticatedAdmin: false,
            isAuthenticatedCustomer: false,
            orders: [],
        }
    );
};
export const App = () => {
    const [data, dispatch] = useReducer(authReducer, {}, init);



    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    return (
        <AuthContext.Provider value={{ data, dispatch }}>
            <div >
                <AppRouter />
            </div>
        </AuthContext.Provider>
    );
};
