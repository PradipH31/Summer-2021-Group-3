import { Switch, Route, useHistory } from "react-router-dom";
// import Messages from '../messages/Messages'
import TeacherClassList from './TeacherClassList';
import AddClass from './AddClass';
import axios from 'axios';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import React from 'react';

const TeacherHome = (props) => {
    let history = useHistory();
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
        <Router>
            <Switch>
                <Route path={`/classes/:id`}>
                    {/* <StudentCourse /> */}
                </Route>
            </Switch>
            <div style={{
                backgroundColor: 'white',
                margin: '0% 1% 1% 1%',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    borderStyle: 'solid',
                }}>
                    <div style={{
                        flexGrow: '1',
                        padding: '1%',
                        backgroundColor: 'green',
                        color: 'white',
                        fontSize: '20px'
                    }}>
                        Classes
                    </div>
                    <div style={{
                        flexGrow: '1',
                        padding: '1%',
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '20px'
                    }}>
                        Students
                    </div>
                    <div
                        onClick={logOut}
                        style={{
                            backgroundColor: 'red',
                            border: 'none',
                            color: 'white',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '20px',
                            cursor: 'pointer',
                            flexGrow: '1',
                            padding: '1%'
                        }}>
                        Log Out
                    </div>
                </div>
                <br></br>
                <div >

                    <TeacherClassList />
                    {/* <AddClass addOrEdit={addOrEdit} /> */}
                </div>
            </div>
        </Router >
    );
};

export default TeacherHome;