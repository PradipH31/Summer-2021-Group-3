import './App.css';
import StudentHome from './components/student/StudentHome'
import TeacherHome from './components/teacher/TeacherHome'
import Login from './components/login'
import { useState } from 'react';

function App() {

  const [page, setPage] = useState("login");
  let pageStatus = <StudentHome page={setPage}/>

  if(page==="login"){
    pageStatus = <TeacherHome page={setPage}/>
    // pageStatus = <Login page={setPage}/>
  }
    
  return (
    <div className="App">
      {pageStatus}
    </div>
  );
}

export default App;
