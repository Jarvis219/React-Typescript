import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthProvider from "./helpers/AuthProvider";
import PrivateRoute from "helpers/PrivateRoute";
import { Loading } from "utils/loading/Loading";
const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
const ClientPage = lazy(() => import("./features/client/pages/ClientPage"));
const AdminPage = lazy(() => import("./features/admin/pages/AdminPage"));
function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
              <PrivateRoute path='/admin' render={() => <AdminPage />} />
              <Route path='/' render={() => <ClientPage />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
