import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Verify } from "./features/client/pages/verify-email/Verify";
import AuthProvider from "./helpers/AuthProvider";
// import PrivateRoute from "helpers/PrivateRoute";

const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
const ClientPage = lazy(() => import("./features/client/pages/ClientPage"));
const AdminPage = lazy(() => import("./features/admin/pages/AdminPage"));
const Page404 = lazy(() => import("./features/client/pages/Page404"));
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/active-email" exact component={Verify} />
              <Route path="/admin" render={() => <AdminPage />} />
              <Route path="/" render={() => <ClientPage />} />
              <Route path="*" exact component={Page404} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
