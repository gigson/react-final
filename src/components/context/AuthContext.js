import React, {useState} from 'react';

export const AuthContext = React.createContext({
    isAuthenticated: false,
    login() {
    },
    logOut() {
    },
});

const AuthContextComponent = (props) => {
    const [isAuth, setIsAuth] = useState(false);

    const loginHandler = () => {
        setIsAuth(true);
    };
    const logOutHandler = () => {
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: isAuth,
                login() {
                    loginHandler();
                },
                logOut() {
                    logOutHandler();
                },
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextComponent;
