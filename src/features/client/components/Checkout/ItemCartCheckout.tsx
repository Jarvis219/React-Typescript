import { useAppSelector } from "app/hook";
import { Fragment, useEffect, useState } from "react";
import { sortText } from "utils/utils";
import { Loading } from "utils/loading/Loading";

export const ItemCartCheckout = ({ product }: any) => {
  const products = useAppSelector((state: any) => {
    return state.product.current;
  });

  const [cart, setCart] = useState<any>();
  useEffect(() => {
    setCart(
      products.filter((item: any) => {
        return item._id === product.product;
      })[0]
    );
  }, [product, products]);

  return (
    <Fragment>
      {cart ? (
        <div className='flex space-x-4 items-center'>
          <div>
            <img src={cart.photo} alt='images' className='w-24' />
          </div>
          <div className='w-[110px]'>
            <h2 className='text-lg font-medium'>{sortText(cart.name, 0, 7)}</h2>
            <span className='block text-sm text-gray-700'>
              Qty: {product.amount}
            </span>
            <span className='text-red-500'>
              Price <span className='checkout-prices'>${cart.price}</span>
            </span>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};
