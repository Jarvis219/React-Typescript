import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { regexEmail } from "../../../helpers/user";
import styles from "../css/Auth.module.css";
import { Register as registerSlice } from "../authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../app/hook";
import { notifyError, notifySuccess } from "utils/utils";
import clsx from "clsx";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
const Register = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const registerSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    if (!regexEmail(data.email)) {
      notifyError("Please check your email again");
    } else if (!data.name) {
      notifyError("Please check your name again");
    } else if (!data.password) {
      notifyError("Please check your password again");
    } else if (!data.confirmPassword) {
      notifyError("Please check your confirm password again");
    } else if (data.password !== data.confirmPassword) {
      notifyError("Password incorrect");
    } else {
      delete data.confirmPassword;
      try {
        const actionResult: any = await dispatch(registerSlice(data));
        const currentUser = unwrapResult(actionResult);
        notifySuccess(`${currentUser.message} 👌`);
        return;
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
              <h2 className='text-white'>Register</h2>
            </div>
          </div>
          <div
            className={clsx(styles["justify-content-center"], styles["row"])}>
            <div className={clsx(styles["col-md-6"], styles["col-lg-4"])}>
              <div className={clsx(styles["login-wrap"], styles["p-0"])}>
                <h3 className='mb-4 text-center text-white hover:text-[#00ff50]'>
                  <Link to='/login'>Have an account?</Link>
                </h3>
                <form
                  onSubmit={handleSubmit(registerSubmit)}
                  className={clsx(styles["signin-form"])}>
                  <div className={clsx(styles["form-group"], " text-center")}>
                    <input
                      type='text'
                      className={clsx(styles["form-control"])}
                      placeholder='Name'
                      {...register("name", { required: true, maxLength: 30 })}
                    />
                    {errors.name && (
                      <span className='text-[#00ff50] font-serif text-xs block -mb-4 '>
                        This field is required & maximum 30 characters
                      </span>
                    )}
                  </div>
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
                  <div className={clsx(styles["form-group"], " text-center")}>
                    <input
                      type='password'
                      className={clsx(styles["form-control"])}
                      placeholder='Confirm-Password'
                      {...register("confirmPassword", {
                        required: true,
                        maxLength: 30,
                        minLength: 7,
                      })}
                    />
                    {errors.confirmPassword && (
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
                      )}
                      disabled={isSubmitting}>
                      {isSubmitting && (
                        <span className='text-[#00ff50] spinner-border spinner-border-sm mr-1'></span>
                      )}
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Register;
