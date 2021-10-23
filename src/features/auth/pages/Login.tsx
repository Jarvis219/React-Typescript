import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { regexEmail } from "../../../helpers/user";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
  const notifyError = (error: string) => toast.error(error);
  const notifySuccess = (success: string) =>
    toast.success(success, { icon: "🚀" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const registerSubmit: SubmitHandler<Inputs> = (data) => {
    checkValidated(data);
  };

  function checkValidated(data: Inputs): void {
    if (!regexEmail(data.email)) {
      notifyError("Please check your email again");
    } else if (!data.password) {
      notifyError("Please check your password again");
    } else {
      notifySuccess("successfully 👌");
      // console.log(data);
    }
  }
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
                  <Link to='/register'>No account?</Link>
                </h3>
                <form
                  onSubmit={handleSubmit(registerSubmit)}
                  className='signin-form'>
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
                  <div className='form-group'>
                    <button
                      type='submit'
                      className='form-control btn btn-primary submit px-3'>
                      Login
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

export default Login;
