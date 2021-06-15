import './App.css';
import StudentHome from './components/student/StudentHome'
import Login from './components/Login'
import {useState} from 'react';

function App() {

  const [page, setPage] = useState("login");
  let compPage = <StudentHome page={setPage}/>

  if(page==="login"){
    compPage = <Login page={setPage}/>
  }
    
  return (
    <div className="App">
      {compPage}
    </div>
  );
}

export default App;
