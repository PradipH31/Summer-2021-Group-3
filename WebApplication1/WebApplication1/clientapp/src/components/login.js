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

    const [errors, setError] = useState('');

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
            console.log(response)
            sessionStorage.setItem("userName", response.data.user.userName);
            sessionStorage.setItem("roles", response.data.roles);
            if (sessionStorage.getItem('roles').includes("Instructor")) {
                history.push("/class")
            } else {
                history.push("/classes");
            }
        }).catch(function (error) {
            console.log(error);
            setError('login')
            console.log(errors)
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
                        <p>Please enter your username and password to login.</p>
                    </div>
                </div>
                <form className="login-form">
                    {errors === 'login' ?
                        <TextField
                            error
                            autoFocus
                            name="username"
                            value={values.username}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Username"
                        />
                        :
                        <TextField
                            autoFocus
                            name="username"
                            value={values.username}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Username"
                        />
                    }
                    <br />
                    <br />
                    {errors === 'login' ?
                        <TextField
                            error
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                            type="password"
                            placeholder="Password"
                        />
                        :
                        <TextField
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                            type="password"
                            placeholder="Password"
                        />
                    }
                    <br />
                    <br />
                    <button className="login-button" onClick={(e) => {
                        e.preventDefault();
                        logIn()
                    }}>
                        login</button>
                    <p className="message">Not registered? <a href="#">Create an account</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login