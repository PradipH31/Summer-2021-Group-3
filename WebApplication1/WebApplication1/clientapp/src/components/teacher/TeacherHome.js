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
    const [classList, setClassList] = useState([])

    useEffect(() => {
        refreshClassList();
    })

    const classAPI = (url = 'https://localhost:44377/api/Classes') => {
        return {
            // fetchAll: (a) => axios.get(url),
            fetchAll: () => axios.post(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.post(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshClassList() {
        // classAPI.fetchAll()
        axios.get('https://localhost:44377/api/Classes')
            .then(res => setClassList(res.data))
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {
        classAPI().create(formData)
            .then(res => {
                onSuccess();
                refreshClassList();
            })
            .catch(err => console.log(err))
    }

    const img = data => (
        <img src={data.imageSrc}></img>
    )

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
                        {/* <StudentNavbar
                            page={props.page}
                            style={{ marginLeft: '30%' }}
                        /> */}
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
            <button onClick={props.page}>Log In</button>
            <TeacherClassList />
            
                {/* {
                    [...Array(Math.ceil(classList.length / 3))].map((e, i) =>
                        <div>{img(classList[3 * i])}</div>
                    )
                } */}
            
            <AddClass addOrEdit={addOrEdit} />
        </Router >
    );
};

export default TeacherHome;