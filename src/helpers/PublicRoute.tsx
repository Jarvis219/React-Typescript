import { Route } from "react-router-dom";
import { Header } from "features/client/components/Header/Header";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { Footer } from "features/client/components/Footer/Footer";
const PublicRoute = ({ ...rest }) => {
  return (
    <Fragment>
      <Header />
      <main className='mt-24'>
        <Route {...rest} />
      </main>
      <Footer />
      <ToastContainer />
    </Fragment>
  );
};

export default PublicRoute;
