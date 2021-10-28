/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { signInWithGoogle, auth } from "../../firebase";
import { LoginWithGoogleAccount } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { DataGoogle } from "../../models/user";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { setToken, setUser } from "utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginGoogle = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const notifySuccess = (success: string) =>
    toast.success(success, { icon: "🚀" });
  const notifyError = (error: string) => toast.error(error);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (!user) return;
      const { uid, photoURL, displayName, email, emailVerified } = user;
      const dataGoogle: DataGoogle = {
        uid,
        photoURL,
        name: displayName,
        email,
        confirmed: emailVerified,
      };
      const token = await user.getIdToken();
      setToken(token);
      try {
        const actionResult: any = await dispatch(
          LoginWithGoogleAccount(dataGoogle)
        );
        const currentUser = await unwrapResult(actionResult);
        const data = {
          _id: currentUser.data._id,
          email: currentUser.data.email,
          name: currentUser.data.name,
          permission: currentUser.data.name,
          photoURL: currentUser.data.photoURL,
        };
        setUser(data);
        notifySuccess(currentUser.message);
        history.push("/");
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
      <a
        onClick={() => {
          auth.signOut();
        }}
        className='px-2 py-2 mr-md-1 rounded cursor-pointer'>
        <span className='ion-logo-facebook mr-2' /> Out
      </a>
      <ToastContainer />
    </div>
  );
};
