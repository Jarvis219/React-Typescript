import { Redirect, Route } from "react-router-dom";
import { Header } from "../features/admin/components/Header/Header";
import SideBar from "features/admin/components/SideBar/SideBar";
import useAuth from "./useAuth";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ ...rest }) => {
  const auth = useAuth();
  if (auth === null || auth === 0) return <Redirect to='/login' />;
  return (
    <div className='mx-auto bg-grey-400'>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <div className='flex flex-1'>
          <SideBar />
          <main className='bg-white-500 flex-1  p-3 overflow-hidden '>
            <Route {...rest} />
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateRoute;
