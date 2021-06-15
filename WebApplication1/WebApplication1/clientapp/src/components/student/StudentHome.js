import React from 'react';
import '../../css/student.css'
import StudentNavbar from './StudentNavbar'
import StudentCourse from './StudentCourse'
import Messages from '../messages/Messages'

const StudentHome = (props) => {
    return (
        <div className="student-page">
            <StudentNavbar page={props.page}/>
            <div className="student-body">
                <StudentCourse />
            </div>
        </div>
    );
};

export default StudentHome;