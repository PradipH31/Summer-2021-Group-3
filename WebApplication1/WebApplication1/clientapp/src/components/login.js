import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Textfield';
import '../css/login.css'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom';

const initialFieldValues = {
    wNumber: '',
    password: '',
}

const Login = () => {
    const [values, setValues] = useState(initialFieldValues)

    const handleInputChange = e => {
        const { name, value } = e.target;
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
        axios.post('https://localhost:44377/api/security/signin', {
            wNumber: values.wNumber,
            password: values.password
        }).then(function (response) {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userId", response.data.userId);
            history.push("/classes");
        }).catch(function (error) {
            console.log(error);
        });
    }

    const logIn = () => {
        handleFormSubmit();
    }
    if (sessionStorage.token) {
        return <Redirect to="/classes" />
    }
    return (
        <div className="login-appearance">
            <h1>Log In</h1>
            <form style={{ margin: '0 30%' }}>
                <div className="login-info-container">
                    <label>
                        <TextField
                            id="standard-number"
                            label="W Number"
                            type="number"
                            name="wNumber"
                            value={values.wNumber}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                        />
                    </label>
                </div>
                <br />
                <label>
                    <div
                        className="login-button-container"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <Button
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            className="centered-button"
                            onClick={() => { logIn() }}>
                            Log In
                        </Button>
                    </div>
                </label>
            </form >
        </div >
    )
}

export default Login