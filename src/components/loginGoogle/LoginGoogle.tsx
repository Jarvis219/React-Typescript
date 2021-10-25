/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { signInWithGoogle, auth } from "../../firebase";
export const LoginGoogle = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (!user) return;
      console.log("login user", user.displayName);

      const token = await user.getIdToken();
      console.log(`token ${token}`);
    });

    return () => unsubscribe();
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
