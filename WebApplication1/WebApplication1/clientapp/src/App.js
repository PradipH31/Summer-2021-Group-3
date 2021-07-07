import './App.css';
import StudentHome from './components/student/StudentHome'
import Login from './components/login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '@fontsource/roboto'

function App() {

  return (
    <div className="App">
      {/* {pageStatus} */}

      <Router>
        <div>
          <nav>
          </nav>
        </div>
        <>
          {/* {{
            if sessionStorage.token {

          }
          } */}

          <Switch>
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