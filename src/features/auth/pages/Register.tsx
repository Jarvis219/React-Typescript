import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regexEmail } from "../../../helpers/user";
import "../css/auth.css";
import { useDispatch } from "react-redux";
import { Register as registerSlice } from "../authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
const Register = () => {
  const dispatch = useDispatch();
  const notifyError = (error: string) => toast.error(error);
  const notifySuccess = (success: string) =>
    toast.success(success, { icon: "🚀" });
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
      } catch (error) {
        console.log(error);
        notifyError(`${error}`);
      }
    }
  };

  return (
    <div className='img js-fullheight body-container'>
      <section className='ftco-section'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-6 text-center mb-5'>
              <h2 className='heading-section'>Register</h2>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-md-6 col-lg-4'>
              <div className='login-wrap p-0'>
                <h3 className='mb-4 text-center text-white hover:text-[#00ff50]'>
                  <Link to='/login'>Have an account?</Link>
                </h3>
                <form
                  onSubmit={handleSubmit(registerSubmit)}
                  className='signin-form'>
                  <div className='form-group text-center'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Name'
                      {...register("name", { required: true, maxLength: 30 })}
                    />
                    {errors.name && (
                      <span className='text-[#00ff50] font-serif text-xs block -mb-4 '>
                        This field is required & maximum 30 characters
                      </span>
                    )}
                  </div>
                  <div className='form-group text-center'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email'
                      {...register("email", { required: true, maxLength: 30 })}
                    />
                    {errors.email && (
                      <span className='text-[#00ff50] font-serif text-xs block -mb-4 '>
                        This field is required & maximum 30 characters
                      </span>
                    )}
                  </div>
                  <div className='form-group text-center'>
                    <input
                      type='password'
                      className='form-control'
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
                  <div className='form-group text-center'>
                    <input
                      type='password'
                      className='form-control'
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
                  <div className='form-group'>
                    <button
                      type='submit'
                      className='form-control btn btn-primary submit px-3'
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
