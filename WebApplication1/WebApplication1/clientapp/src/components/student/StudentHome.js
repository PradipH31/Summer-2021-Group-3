import '../../css/student.css'
import StudentNavbar from './StudentNavbar'
import StudentCourseList from './StudentCourseList'
import { Switch, Route, useHistory } from "react-router-dom";
import StudentCourse from './StudentCourse';
import Chat from '../messaging/Chat';

const StudentHome = () => {
    let history = useHistory();
    if (!sessionStorage.token) {
        history.push("/")
    }
    return (
        <div className="student-body">
            <div>
                <nav>
                    <ul style={{
                        listStyleType: 'unset',
                        display: 'unset',
                        paddingInlineStart: 'unset',
                        marginBlockStart: 'unset',
                        marginBlockEnd: 'unset'
                    }}>
                        <StudentNavbar style={{ marginLeft: '30%' }} />
                    </ul>
                </nav>
            </div>
            <div className="student-body">
                <Switch>
                    <Route path="/classes/messages">
                        <Chat />
                    </Route>
                    <Route path={`/classes/:id`}>
                        <StudentCourse />
                    </Route>
                    <StudentCourseList />
                </Switch>
            </div>
        </div>
    );
};

export default StudentHome;