import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Verify } from "./features/client/pages/verify-email/Verify";
import AuthProvider from "./helpers/AuthProvider";
import PrivateRoute from "helpers/PrivateRoute";
const Home = lazy(() => import("./features/pages/Home"));
const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <PrivateRoute path='/' exact component={Home} />
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
              <Route path='/active-email' exact component={Verify} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
