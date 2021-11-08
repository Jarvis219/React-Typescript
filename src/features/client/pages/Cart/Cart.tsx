import { useAppDispatch, useAppSelector } from "app/hook";
import { Fragment, memo, useEffect, useState } from "react";
import { CartItem } from "../../components/Cart/CartItem";
import {
  getUser,
  notifyError,
  notifySuccess,
  changeDisplayPrices,
  getTotal,
  setPrice,
} from "utils/utils";
import { unwrapResult } from "@reduxjs/toolkit";
import { ListCartUser, RemoveCart } from "features/admin/pages/Cart/CartSlice";
import { useHistory } from "react-router-dom";

const Cart = ({ handleCart, status }: any) => {
  const history = useHistory();
  const [display, setDisplay] = useState<boolean>(status);
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state: any) => {
    return state.cart.current;
  });
  const [total, setTotal] = useState<string | number>(getTotal());

  useEffect(() => {
    setDisplay(status);
  }, [status]);
  const handleDisplay = () => {
    handleCart(false);
    setDisplay(false);
  };

  const handleDeleteCart = async (id: string): Promise<void> => {
    try {
      const actionResult: any = await dispatch(RemoveCart(id));
      const currentCategory = unwrapResult(actionResult);
      await getCartUser();
      setPrice();
      setTotal(getTotal());
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      notifyError("Delete to cart failed!");
    }
  };

  const getCartUser = async () => {
    try {
      const { _id } = getUser();
      await dispatch(ListCartUser(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const toCheckout = () => {
    if (getTotal() === 0 || typeof getTotal() !== "number") {
      notifyError("Please order before paying!");
      return;
    }
    history.push("/check-out");
  };
  return (
    <Fragment>
      <div>
        <div
          className={
            display
              ? "fixed inset-0 overflow-hidden "
              : "fixed  overflow-hidden"
          }>
          <div
            className={
              display
                ? "absolute inset-0 overflow-hidden ease-in-out duration-500"
                : "absolute overflow-hidden ease-in-out duration-500"
            }>
            <div
              onClick={handleDisplay}
              className={
                display
                  ? "absolute inset-0 bg-gray-200 opacity-50 transition-opacity ease-in-out duration-500"
                  : "absolute bg-gray-200 opacity-0 transition-opacity ease-in-out  duration-500"
              }
              aria-hidden='true'
            />
            <div
              className={
                display
                  ? "fixed inset-y-[88px] bottom-0 right-0 pl-10 max-w-full flex "
                  : "translate-x-full"
              }>
              <div
                id='close-nav-cart'
                className={
                  display
                    ? "w-screen max-w-md  translate-x-0  transition ease-in-out duration-500 sm:duration-700"
                    : "w-screen max-w-md  translate-x-full  transition ease-in-out duration-500 sm:duration-700"
                }>
                <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
                  <div className='flex-1 py-6 overflow-y-auto px-4 sm:px-6'>
                    <div className='flex items-start justify-between'>
                      <h2
                        className='text-lg font-medium text-gray-900'
                        id='slide-over-title'>
                        Shopping cart
                      </h2>
                      <div className='ml-3 h-7 flex items-center'>
                        <button
                          onClick={handleDisplay}
                          type='button'
                          className='-m-2 p-2 focus:outline-none  text-gray-400 hover:text-gray-500'>
                          <span className='sr-only'>Close panel</span>
                          {/* Heroicon name: outline/x */}
                          <svg
                            className='h-6 w-6'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className='mt-8'>
                      <div className='flow-root'>
                        <ul className='-my-6 divide-y divide-gray-200'>
                          {carts.map((item: any, index: number) => {
                            return (
                              <CartItem
                                handleDeleteCart={handleDeleteCart}
                                key={index}
                                amount={item.amount}
                                id={item.product}
                                idCart={item._id}
                                setTotalCart={setTotal}
                              />
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                    <div className='flex justify-between text-base font-medium text-gray-900'>
                      <p>Subtotal</p>
                      <p className='text-red-500'>
                        {changeDisplayPrices(total)}
                      </p>
                    </div>
                    <p className='mt-0.5 text-sm text-gray-500'>
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className='mt-6'>
                      <button
                        onClick={toCheckout}
                        className='flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
                        Checkout
                      </button>
                    </div>
                    <div className='mt-6 flex justify-center text-sm text-center text-gray-500'>
                      <p>
                        or{" "}
                        <button
                          onClick={handleDisplay}
                          type='button'
                          className='text-indigo-600 font-medium hover:text-indigo-500'>
                          Continue Shopping<span aria-hidden='true'> →</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default memo(Cart);
