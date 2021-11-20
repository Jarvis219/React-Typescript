import styles from "./verify.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActiveAccount } from "../../../auth/authSlice";
import clsx from "clsx";

export const Verify = () => {
  const dispatch = useDispatch();
  const tokenActive: string = window.location.href.split("=")[1];
  useEffect(() => {
    function activeAccount(): void {
      dispatch(ActiveAccount(tokenActive));
    }
    activeAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className={clsx(styles["body"], "mb-8")}>
        <div className={clsx(styles["activation"])}>
          <h1>Successful Activation</h1>
          <div className={clsx(styles["success-animation"])}>
            <svg
              className={clsx(styles["checkmark"])}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 52 52'>
              <circle
                className={clsx(styles["checkmark__circle"])}
                cx={26}
                cy={26}
                r={25}
                fill='none'
              />
              <path
                className={clsx(styles["checkmark__check"])}
                fill='none'
                d='M14.1 27.2l7.1 7.2 16.7-16.8'
              />
            </svg>
          </div>
          <p>
            Thank you for trusting and choosing us, hope you will have a good
            experience at ReactJS by Quang
          </p>
          <div className=' '>
            <Link
              to='/login'
              className={clsx(
                styles["btn"],
                styles["btn-sm"],
                styles["animated-button"],
                styles["victoria-two"],
                "uppercase"
              )}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
