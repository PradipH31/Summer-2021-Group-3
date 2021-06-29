import './App.css';
import StudentHome from './components/student/StudentHome'
import TeacherHome from './components/teacher/TeacherHome'
import Login from './components/login'
import { useState } from 'react';
import '@fontsource/roboto'

function App() {

  const [page, setPage] = useState("logout");
  // let pageStatus = <StudentHome page={setPage}/>
  let pageStatus;

  if(page==="logout"){
    // pageStatus = <TeacherHome page={setPage}/>
    pageStatus = <Login page={setPage}/>
  } else if(page==="student"){
    pageStatus = <StudentHome page={setPage}/>
  } else {
    pageStatus = <TeacherHome page={setPage}/>
  }
    
  return (
    <div className="App">
      {pageStatus}
    </div>
  );
}

export default App;
