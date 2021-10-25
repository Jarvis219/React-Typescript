/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { signInWithGoogle, auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { LoginWithGoogleAccount } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { DataGoogle } from "../../models/user";
import { useHistory } from "react-router-dom";
export const LoginGoogle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      // const token = await user.getIdToken();
      try {
        const actionResult: any = await dispatch(
          LoginWithGoogleAccount(dataGoogle)
        );
        unwrapResult(actionResult);
        history.push("/");
      } catch (error) {
        console.log(error);
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
      {/* <a
        onClick={() => {
          auth.signOut();
        }}
        className='px-2 py-2 mr-md-1 rounded cursor-pointer'>
        <span className='ion-logo-facebook mr-2' /> Out
      </a> */}
    </div>
  );
};
