import './App.css';
import StudentHome from './components/student/StudentHome'
import Login from './components/login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TeacherHome from './components/teacher/TeacherHome'
import '@fontsource/roboto'

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <nav>
          </nav>
        </div>
        <>
          <Switch>
            <Route path="/class">
              <TeacherHome />
            </Route>
            <Route path="/classes">
              <StudentHome />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;