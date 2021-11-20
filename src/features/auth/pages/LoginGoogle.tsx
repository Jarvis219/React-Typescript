/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { signInWithGoogle, auth } from "../../../firebase";
import { LoginWithGoogleAccount, UpdateToken } from "../authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { DataGoogle } from "../../../models/user";
import { useAppDispatch } from "../../../app/hook";
import { setToken, setUser, notifySuccess, notifyError } from "utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginGoogle = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (!user) return;
      const { uid, photoURL, displayName, email, emailVerified } = user;
      const token = await user.getIdToken();
      setToken(token);
      const dataGoogle: DataGoogle = {
        uid,
        photoURL,
        name: displayName,
        email,
        confirmed: emailVerified,
        tokenGoogle: token,
      };

      console.log(dataGoogle);
      try {
        const actionResult: any = await dispatch(
          LoginWithGoogleAccount(dataGoogle)
        );
        const currentUser = await unwrapResult(actionResult);
        const data = {
          _id: currentUser.data._id,
          email: currentUser.data.email,
          name: currentUser.data.name,
          permission: currentUser.data.permission,
          photoURL: currentUser.data.photoURL,
        };
        setUser(data);

        await dispatch(
          UpdateToken({ id: currentUser.data._id, tokenGoogle: token })
        );
        notifySuccess(currentUser.message);
        window.location.href = "/";
      } catch (error) {
        notifyError("login failure");
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      onClick={signInWithGoogle}
      className='bg-gray-900 cursor-pointer hover:bg-white hover:text-black flex justify-center text-center'>
      <span className='px-2 py-3 mr-md-1 rounded flex gap-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 '
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>{" "}
        Google
      </span>
      <ToastContainer />
    </div>
  );
};
