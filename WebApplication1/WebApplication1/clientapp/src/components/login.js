import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Textfield';
import '../css/login.css'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom';

const initialFieldValues = {
    username: '',
    password: '',
}

const Login = () => {
    const [values, setValues] = useState(initialFieldValues)

    const handleInputChange = e => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setValues({
            ...values,
            [name]: value
        })
    }

    // const resetForm = () => {
    //     setValues(initialFieldValues)
    //     document.getElementById('image-uploader').value = null;
    //     setErrors({});
    // }
    let history = useHistory();

    const handleFormSubmit = () => {
        axios.post('https://localhost:44377/api/auth/login', {
            username: values.username,
            password: values.password
        }).then(function (response) {
            // sessionStorage.setItem("token", response.data.token);
            console.log(response)
            sessionStorage.setItem("userName", response.data.user.userName);
            sessionStorage.setItem("roles", response.data.roles);
            // sessionStorage.setItem("userId", response.data.userId);
            // sessionStorage.setItem("firstName", response.data.firstName);            
            if (sessionStorage.getItem('roles').includes("Instructor")) {
                history.push("/class")
            } else {
                history.push("/classes");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const logIn = () => {
        handleFormSubmit();
    }
    if (sessionStorage.getItem('roles')) {
        if (sessionStorage.getItem('roles').includes("Instructor")) {
            return <Redirect to="/class" />
        } else if (sessionStorage.getItem('roles').includes("Student")) {
            return <Redirect to="/classes" />
        }
    }
    return (
        <div className="login-page">
            <div className="form">
                <div className="login">
                    <div className="login-header">
                        <h3>Southeastern University Login</h3>
                        <p>Please enter your WNumber and password to login.</p>
                    </div>
                </div>
                <form className="login-form">
                    <input
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="username"
                    />
                    <input
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                        type="password"
                        placeholder="password"
                    />
                    <button onClick={() => { logIn() }}>
                        login</button>
                    <p className="message">Not registered? <a href="#">Create an account</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login