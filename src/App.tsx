import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import { Home } from "./features/pages/Home";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
