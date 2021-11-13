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
    <div className='social d-flex text-center'>
      <a
        onClick={signInWithGoogle}
        className='px-2 py-2 mr-md-1 rounded cursor-pointer'>
        <span className='ion-logo-facebook mr-2' /> Google
      </a>
      <ToastContainer />
    </div>
  );
};
