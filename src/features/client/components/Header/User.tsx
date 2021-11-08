import { Fragment, memo, useEffect, useState } from "react";
import { getToken, getUser, logout } from "utils/utils";
import { UserAuth } from "constants/user";
import { Link } from "react-router-dom";
import Cart from "features/client/pages/Cart/Cart";

const User = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
  const [cart, setCart] = useState<boolean>(false);
  useEffect(() => {
    if (!getUser() || !getToken()) return;
    const { permission } = getUser();
    if (getToken() && permission === UserAuth.admin) {
      setIsAdmin(true);
    }
    if (getToken() && getUser()) {
      setUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken, getUser]);

  const handleCart = () => {
    setCart(true);
  };
  return (
    <Fragment>
      <div className='relative group inline-block no-underline hover:text-black '>
        <button className='flex flex-row items-center w-full px-4 py-4 mt-2 text-base font-bold text-left uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat'>
          <svg
            className='fill-current hover:text-black'
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'>
            <circle fill='none' cx={12} cy={7} r={3} />
            <path d='M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z' />
          </svg>
        </button>
        <div className='absolute z-10  hidden bg-grey-200 group-hover:block'>
          <div className='px-3 pt-2 pb-4    bg-gray-200 shadow-lg'>
            <div className='text-gray-700'>
              {isAdmin ? (
                <Link
                  to='/admin'
                  className='flex justify-between gap-2 py-1 hover:text-green-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
                    />
                  </svg>
                  <span className='block'>Admin</span>
                </Link>
              ) : (
                ""
              )}

              {user ? (
                <div>
                  <button
                    onClick={() => setCart(!cart)}
                    className='flex justify-between gap-2 py-1 focus:outline-none  hover:text-green-400'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                      />
                    </svg>
                    <span className='block'>Cart</span>
                  </button>
                  <Link
                    onClick={logout}
                    to='/login'
                    className='flex justify-between gap-2 py-1 hover:text-green-400'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      />
                    </svg>
                    <span className='block'>Logout</span>
                  </Link>
                </div>
              ) : (
                <Fragment>
                  <Link
                    to='/register'
                    className='flex justify-between gap-2 py-1 hover:text-green-400'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                      />
                    </svg>
                    <span className='block'>Register</span>
                  </Link>
                  <Link
                    to='/login'
                    className='flex gap-2  py-1 hover:text-green-400'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                      />
                    </svg>
                    <span className='block'>Login</span>
                  </Link>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <Cart handleCart={handleCart} status={cart} />
    </Fragment>
  );
};

export default memo(User);
