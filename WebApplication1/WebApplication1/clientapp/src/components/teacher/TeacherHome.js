import { Switch, Route, useHistory } from "react-router-dom";
// import Messages from '../messages/Messages'
import TeacherClassList from './TeacherClassList';
import AddClass from './AddClass';
import axios from 'axios';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import StudentComponent from "./Student/StudentComponent";

const TeacherHome = (props) => {
    let history = useHistory();
    const [title, setTitle] = useState('Classes')
    if (!sessionStorage.roles.includes('Instructor')) {
        history.push("/")
    }

    const classAPI = (url = 'https://localhost:44377/api/Class') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.post(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    const addOrEdit = (formData, onSuccess) => {
        classAPI().create(formData)
            .then(res => {
                onSuccess();
                // refreshClassList();
            })
            .catch(err => console.log(err))
    }

    const logOut = () => {
        // sessionStorage.removeItem("token")
        sessionStorage.removeItem("userName")
        sessionStorage.removeItem("roles")
        // sessionStorage.removeItem("userId")
        history.push("/");
    }

    return (
        <>
            <div style={{
                backgroundColor: 'white',
                margin: '0% 1% 1% 1%',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    // borderStyle: 'solid',
                    backgroundColor: '#2196f3',
                }}>
                    <div style={{
                        color: 'white',
                        fontSize: '30px',
                        paddingLeft: '5%'
                    }}>
                        {title}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        // borderStyle: 'solid',
                        backgroundColor: '#2196f3',
                        // alignItems: 'baseline'
                    }}>
                        <div style={{
                            // padding: '1%',
                            cursor: 'pointer',
                            justifyContent: 'flex-start',
                            color: 'white',
                            fontSize: '20px',
                            border: 'solid',
                            borderRadius: '1px',
                            margin: '0 2%'
                        }}
                            onClick={() => {
                                history.push("/class");
                                setTitle("Classes")
                            }}
                        >
                            Classes
                        </div>
                        <div style={{
                            // padding: '1%',
                            color: 'white',
                            border: 'solid',
                            fontSize: '20px',
                            cursor: 'pointer',
                            borderRadius: '1px',
                            marginRight: '2%'
                        }}
                            onClick={() => {
                                history.push("/class/students");
                                setTitle('Students')
                            }}
                        >
                            Students
                        </div>
                        <div style={{
                            backgroundColor: 'red',
                            color: 'white',
                            fontSize: '20px',
                            cursor: 'pointer',
                            // padding: '1%',
                            // paddingLeft: '3%'
                        }}
                            onClick={logOut}
                        >
                            Log<span style={{color:'red'}}>a</span>Out
                        </div>
                    </div>
                </div>
                <br></br>
                <Switch>
                    <Route path={`/class/students`}>
                        <StudentComponent />
                    </Route>
                    <TeacherClassList />
                </Switch>
                <div >
                </div>
            </div>
        </ >
    );
};

export default TeacherHome;