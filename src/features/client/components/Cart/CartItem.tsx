import { useAppSelector } from "app/hook";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSortText, setTotal } from "utils/utils";

export const CartItem = ({
  id,
  amount,
  handleDeleteCart,
  idCart,
  setTotalCart,
}: any) => {
  const products = useAppSelector((state: any) => {
    return state.product.current;
  });

  const [cart, setCart] = useState<any>();
  useEffect(() => {
    setCart(
      products.filter((item: any) => {
        return item._id === id;
      })[0]
    );
  }, [id, products]);

  useEffect(() => {
    setPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, amount, handleDeleteCart, idCart]);

  const setPrice = () => {
    const arr: any = [];
    const price = document.querySelectorAll(".product-price-cart");
    price.forEach((item: any) => {
      arr.push(+item.innerHTML);
    });
    if (arr.length === 0) {
      return;
    }
    const reducer = (previousValue: number, currentValue: number) =>
      previousValue + currentValue;
    setTotalCart(arr.reduce(reducer));
    setTotal(arr.reduce(reducer));
  };
  return (
    <Fragment>
      {cart ? (
        <li className='py-6 flex'>
          <div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
            <img
              src={cart.photo}
              alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
              className='w-full h-full object-center object-cover'
            />
          </div>
          <div className='ml-4 flex-1 flex flex-col'>
            <div>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <h3>
                  <Link to={`/product/${cart._id}`}>
                    {getSortText(cart.name)}
                  </Link>
                </h3>
                <p className='w-1/4 text-center '>$ {cart.price}</p>
              </div>
              <p className='mt-1 text-sm text-gray-500'>{cart.category.name}</p>
              <p className='text-gray-500'>Qty: {amount}</p>
            </div>
            <div className='flex-1 flex items-end justify-between text-sm'>
              <p className='text-base font-medium text-red-400'>
                Total:${" "}
                <span className='product-price-cart'>
                  {cart.price * amount}
                </span>
              </p>
              <div className='flex'>
                <span
                  onClick={() => handleDeleteCart(idCart)}
                  className='font-medium cursor-pointer  text-indigo-600 hover:text-indigo-500'>
                  Remove
                </span>
              </div>
            </div>
          </div>
        </li>
      ) : (
        ""
      )}
    </Fragment>
  );
};
