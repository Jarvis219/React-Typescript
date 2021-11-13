/* eslint-disable array-callback-return */
import { useAppSelector, useAppDispatch } from "app/hook";
import { ItemCartCheckout } from "features/client/components/Checkout/ItemCartCheckout";
import "./checkout.css";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getUser,
  getToken,
  getTotal,
  changeDisplayPrices,
  notifySuccess,
  notifyError,
} from "utils/utils";
import { CheckoutForm } from "features/client/components/Checkout/CheckoutForm";
import { OrderPay } from "constants/order";
import { CreateOrder } from "features/admin/pages/Order/OrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ListCartUser, RemoveCart } from "features/admin/pages/Cart/CartSlice";
import { UpdateProduct } from "features/admin/pages/Products/ProductSlice";

const Checkout = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state: any) => {
    return state.cart.current;
  });
  const products = useAppSelector((state: any) => {
    return state.product.current;
  });
  const [total, setTotal] = useState<number>(getTotal());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!getToken() || !getUser() || getTotal() === 0) {
      history.push("/");
    }
  }, [history]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTotal(getTotal());
  });

  const handleOrder = async (data: any): Promise<void> => {
    setLoading(true);
    const dataProducts = filterProductToCart();
    let price = getTotal();
    if (data.pay === OrderPay.Payment_on_delivery) {
      price += 10;
    }

    try {
      const actionResult: any = await dispatch(
        CreateOrder(
          Object.assign(
            {},
            data,
            { product: dataProducts },
            (data["price"] = price)
          )
        )
      );
      const currentCategory = await unwrapResult(actionResult);
      await updateAmountProducts(dataProducts);
      clearCart(currentCategory.message + " 👌");
    } catch (error) {
      notifyError("Check out failure !!!");
    }
  };

  const updateAmountProducts = async (data: any): Promise<void> => {
    data.forEach(async (item: any) => {
      try {
        await dispatch(
          UpdateProduct({
            _id: item.product._id,
            quantity: item.product.quantity - item.amount,
            sold: item.product.sold + item.amount,
          })
        );
      } catch (error) {
        console.log(error);
      }
    });
  };

  const filterProductToCart = () => {
    const idCart: any = [];
    carts.forEach((itemId: any) => {
      idCart.push({ id: itemId.product, amount: itemId.amount });
    });

    const dataProduct: any = [];
    products.forEach((item: any, index: number) => {
      idCart.forEach((itemId: any) => {
        if (item._id === itemId.id) {
          dataProduct.push({ product: item, amount: itemId.amount });
        }
      });
    });
    return dataProduct;
  };

  const clearCart = async (message: string): Promise<void> => {
    sessionStorage.removeItem("total");
    new Promise((resolve) => {
      resolve(
        carts.forEach(async (item: any) => {
          return new Promise(() => {
            dispatch(RemoveCart(item._id));
          });
        })
      );
    }).then(() => {
      setTimeout(() => {
        getCartUser(message);
      }, 2000);
    });
  };

  const getCartUser = async (message: string) => {
    try {
      if (!getUser()) return;
      const { _id } = getUser();
      await dispatch(ListCartUser(_id));
      notifySuccess(message);
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <div>
        <div className='mt-20'>
          <h1 className='flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl uppercase'>
            Checkout
          </h1>
        </div>
        <div className='container p-12 mx-auto'>
          <div className='flex flex-col w-full px-0 mx-auto md:flex-row'>
            <div className='flex flex-col md:w-full'>
              <h2 className='mb-4 font-bold md:text-xl text-heading '>
                Shipping Address
              </h2>
              <CheckoutForm loading={loading} handleOrder={handleOrder} />
            </div>
            <div className='flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5'>
              <div className='pt-12 md:pt-0 2xl:ps-4'>
                <h2 className='text-xl font-bold'>Order Summary</h2>
                <div className='mt-8'>
                  <div className='flex flex-col space-y-4'>
                    {carts.map((item: any, index: number) => {
                      return <ItemCartCheckout key={index} product={item} />;
                    })}
                  </div>
                </div>
                <div className='flex p-4 mt-4'>
                  <h2 className='text-xl font-bold'>Pay</h2>
                </div>
                <div className='flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0'>
                  Subtotal
                  <span className='ml-2 text-red-400'>
                    {changeDisplayPrices(total)}
                  </span>
                </div>
                <div className='flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0'>
                  Shipping Tax
                  <span className='ml-2 text-red-500'>
                    {changeDisplayPrices(10)}
                  </span>
                </div>
                <div className='flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0'>
                  Total
                  <span className='ml-2 text-red-500'>
                    {" "}
                    {changeDisplayPrices(total + 10)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
