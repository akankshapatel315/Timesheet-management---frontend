import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { Dashboard } from "./Dashboard/Dashboard";
import { UserDetail } from "./UserDetail/UserDetail";
import { Timesheet } from "./Timesheet/Timesheet";
import { Header } from "./Header/Header";
import { React, useState, useEffect } from "react";

function App() {
  // const [user, setUser] = useState(localStorage.getItem("Name"));

  // useEffect(() => {
  //   setUser(localStorage.getItem("Name"));
  // });
  // console.log(user, "userus in app");
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/userDetail" component={UserDetail} />
          <Route exact path="/timesheet" component={Timesheet} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
