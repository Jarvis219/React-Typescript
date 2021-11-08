import { Route } from "react-router-dom";
import { Header } from "features/client/components/Header/Header";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
const PublicRoute = ({ ...rest }) => {
  return (
    <Fragment>
      <Header />
      <div className='mt-24'>
        <Route {...rest} />
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default PublicRoute;
