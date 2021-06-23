import './App.css';
import StudentHome from './components/student/StudentHome'
import Login from './components/login'
import { useState } from 'react';

function App() {

  const [page, setPage] = useState("login");
  let pageStatus = <StudentHome page={setPage}/>

  if(page==="login"){
    pageStatus = <Login page={setPage}/>
  }
    
  return (
    <div className="App">
      {pageStatus}
    </div>
  );
}

export default App;
