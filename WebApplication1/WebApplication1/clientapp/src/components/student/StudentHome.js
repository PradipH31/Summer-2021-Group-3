import '../../css/student.css'
import StudentNavbar from './StudentNavbar'
import StudentCourseList from './StudentCourseList'
import Messages from '../messages/Messages'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import StudentCourse from './StudentCourse';

const StudentHome = () => {
    let history = useHistory();
    if (!sessionStorage.token) {
        history.push("/")
    }
    return (
        <>
            <div>
                <nav>
                    <ul style={{
                        listStyleType: 'unset',
                        display: 'unset',
                        paddingInlineStart: 'unset',
                        marginBlockStart: 'unset',
                        marginBlockEnd: 'unset'
                    }}>
                        <StudentNavbar
                            style={{ marginLeft: '30%' }}
                        />
                    </ul>
                </nav>
            </div>
            <div className="student-body">

            <Switch>
                <Route path="/classes/messages">
                    <Messages />
                </Route>
                <Route path={`/classes/:id`}>
                    <StudentCourse />
                </Route>
                <StudentCourseList />
            </Switch>
            </div>
        </>
    );
};

export default StudentHome;