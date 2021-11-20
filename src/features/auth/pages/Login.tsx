import { ToastContainer } from "react-toastify";
import styles from "../css/Auth.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { regexEmail } from "../../../helpers/user";
import { Link } from "react-router-dom";
import { Login as loginSlice } from "../authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { LoginGoogle } from "./LoginGoogle";
import { useAppDispatch } from "../../../app/hook";
import {
  setToken,
  setUser,
  setRefreshToken,
  notifyError,
  notifySuccess,
} from "utils/utils";
import clsx from "clsx";

type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const registerSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    if (!regexEmail(data.email)) {
      notifyError("Please check your email again");
    } else if (!data.password) {
      notifyError("Please check your password again");
    } else {
      try {
        const actionResult: any = await dispatch(loginSlice(data));

        const currentUser = unwrapResult(actionResult);
        setToken(currentUser.token);
        setUser(currentUser.user);
        setRefreshToken(currentUser.refreshToken);
        notifySuccess("Login successfully 👌");
        window.location.href = "/";
      } catch (error: any) {
        notifyError(error.response.data.error);
      }
    }
  };

  return (
    <div
      className={clsx(
        styles["img"],
        styles["js-fullheight"],
        styles["body-container"]
      )}>
      <section className={clsx(styles["ftco-section"])}>
        <div className={clsx(styles["container"])}>
          <div
            className={clsx(styles["justify-content-center"], styles["row"])}>
            <div className='col-md-6 text-center mb-5'>
              <h2 className='text-white'>Login</h2>
            </div>
          </div>
          <div
            className={clsx(styles["justify-content-center"], styles["row"])}>
            <div className={clsx(styles["col-md-6"], styles["col-lg-4"])}>
              <div className={clsx(styles["login-wrap"], styles["p-0"])}>
                <h3 className='mb-4 text-center text-white hover:text-[#00ff50]'>
                  <Link to='/register'>No account?</Link>
                </h3>
                <form
                  onSubmit={handleSubmit(registerSubmit)}
                  className={clsx(styles["signin-form"])}>
                  <div className={clsx(styles["form-group"], " text-center")}>
                    <input
                      type='email'
                      className={clsx(styles["form-control"])}
                      placeholder='Email'
                      {...register("email", { required: true, maxLength: 30 })}
                    />
                    {errors.email && (
                      <span className='text-[#00ff50] font-serif text-xs block -mb-4 '>
                        This field is required & maximum 30 characters
                      </span>
                    )}
                  </div>
                  <div className={clsx(styles["form-group"], " text-center")}>
                    <input
                      type='password'
                      className={clsx(styles["form-control"])}
                      placeholder='Password'
                      {...register("password", {
                        required: true,
                        maxLength: 30,
                        minLength: 7,
                      })}
                    />
                    {errors.password && (
                      <span className='text-[#00ff50] font-serif text-xs block -mb-4 '>
                        This field is required & allowed characters from 7 to 30
                      </span>
                    )}
                    <span className='fa fa-fw fa-eye field-icon toggle-password' />
                  </div>
                  <div className={clsx(styles["form-group"])}>
                    <button
                      type='submit'
                      className={clsx(
                        styles["form-control"],
                        styles["btn"],
                        styles["btn-primary"],
                        styles["submit"],
                        "px-3"
                      )}>
                      Login
                    </button>
                  </div>
                </form>
                <p className='w-100 text-center'>— Or Sign In With —</p>
                <LoginGoogle />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
