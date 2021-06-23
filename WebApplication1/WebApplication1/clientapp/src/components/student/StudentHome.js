import '../../css/student.css'
import StudentNavbar from './StudentNavbar'
import StudentCourseList from './StudentCourseList'
import Messages from '../messages/Messages'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const StudentHome = (props) => {
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
                        <StudentNavbar
                            page={props.page}
                            style={{ marginLeft: '30%' }}
                        />
                    </ul>
                </nav>
            </div>
            <div className="student-body">
                <Switch>
                    <Route path="/classes">
                        <StudentCourseList />
                    </Route>
                    <Route path="/messages">
                        <Messages />
                    </Route>
                    <Route path="/">
                        <StudentCourseList />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default StudentHome;