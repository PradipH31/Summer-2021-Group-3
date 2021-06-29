import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Textfield';
import '../css/login.css'

const Login = (props) => {
    const logIn = (ent) => {
        props.page(ent);
    }
    return (
        <div className="login-appearance">
            <h1>Log In</h1>
            <form>
                <div className="login-info-container">
                    <label>
                        <TextField
                            id="standard-number"
                            label="W Number"
                            type="number"
                        />
                    </label>
                    <br />
                    <label>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
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
                            variant="contained"
                            color="primary"
                            className="centered-button"
                            onClick={() => { logIn("student") }}>
                            Log In as Student
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="centered-button"
                            onClick={() => { logIn("teacher") }}>
                            Log In as Teacher
                        </Button>
                    </div>
                </label>
            </form >
        </div >
    )
}

export default Login