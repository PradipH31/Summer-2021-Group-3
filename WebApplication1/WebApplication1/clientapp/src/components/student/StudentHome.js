import React from 'react';
import '../../css/student.css'
import StudentNavbar from './StudentNavbar'
import StudentCourse from './StudentCourse'

const StudentHome = () => {
    return (
        <div class="student-page">
            <StudentNavbar />
            <div class="student-body">
                <StudentCourse />
            </div>
        </div>
    );
};

export default StudentHome;