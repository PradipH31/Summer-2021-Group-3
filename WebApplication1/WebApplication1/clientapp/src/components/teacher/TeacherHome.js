import '../../css/student.css'
// import Messages from '../messages/Messages'
import TeacherClassList from './TeacherClassList';
import AddClass from './AddClass';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

const TeacherHome = (props) => {

    const classAPI = (url = 'https://localhost:44377/api/Classes') => {
        return {
            // fetchAll: (a) => axios.get(url),
            fetchAll: () => axios.post(url),
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
        props.page("logout");
    }

    return (
        <Router>
            <div>
                <nav>
                    <ul style={{
                        listStyleType: 'unset',
                        display: 'unset',
                        paddingInlineStart: 'unset',
                        marginBlockStart: 'unset',
                        marginBlockEnd: 'unset'
                    }}>
                    </ul>
                </nav>
            </div>
            <div className="student-body">
                <Switch>
                    <Route path={`/classes/:id`}>
                        {/* <StudentCourse /> */}
                    </Route>
                    <Route path="/classes">
                        {/* <StudentCourseList /> */}
                    </Route>
                    <Route path="/messages">
                        {/* <Messages /> */}
                    </Route>
                    <Route path="/">
                        {/* <StudentCourseList /> */}
                    </Route>

                </Switch>
            </div>
            <button onClick={logOut}>Log Out</button>
            <div style={{
                display: "flex",
                margin: '1% 1%'
            }}>
                <div style={{
                    flexGrow: 3,
                }}>
                    <TeacherClassList />
                </div>
                <div style={{
                    flexGrow: 1,
                    backgroundColor: 'gainsboro',
                    color: 'darkorange',
                    margin: 'inherit'
                }}><AddClass addOrEdit={addOrEdit} /></div>
            </div>
        </Router >
    );
};

export default TeacherHome;