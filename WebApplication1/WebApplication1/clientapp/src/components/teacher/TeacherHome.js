import '../../css/student.css'
// import StudentNavbar from './StudentNavbar'
// import StudentCourseList from './StudentCourseList'
// import Messages from '../messages/Messages'
// import StudentCourse from './StudentCourse';
import TeacherClassList from './TeacherClassList';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const TeacherHome = (props) => {
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
        </Router >
    );
};

export default TeacherHome;