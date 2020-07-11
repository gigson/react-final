import React, {useContext, useRef} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useForm} from 'react-hook-form';


function Account(props) {
    const {errors, handleSubmit, register, watch} = useForm();

    const {login, logOut} = useContext(AuthContext);

    if (localStorage.getItem("loggedIn") != null) {
        if (localStorage.getItem("loggedIn") === "true") {
            login()
        }
    }

    const onSubmit = (data) => {
        console.log(data);
        if (data['password'] === 'admin') {
            localStorage.setItem("loggedIn", true)
            login();
        }
    };

    const onLogout = () => {
        localStorage.setItem("loggedIn", false)
        logOut()
    }
    const formRef = useRef(null);

    const {isAuthenticated} = useContext(AuthContext);

    if (isAuthenticated) {
        return <div>
            <button onClick={onLogout}>logout</button>
        </div>
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        aria-describedby="emailHelp"
                        name="address"
                        ref={register({required: true, minLength: 3})}
                    />
                    {errors.address && errors.address.type === 'required' && (
                        <small
                            id="emailHelp"
                            style={{color: 'red'}}
                        >
                            Input required
                        </small>
                    )}
                    {errors.address && errors.address.type === 'minLength' && (
                        <small
                            id="emailHelp"
                            style={{color: 'red'}}
                        >
                            Min Length is 3
                        </small>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="exampleInputPassword1"
                        ref={register({required: true})}
                    />
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Account;
