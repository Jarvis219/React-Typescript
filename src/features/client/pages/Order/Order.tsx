import { useAppSelector } from "app/hook";
import ButtonUI1 from "components/Button/Button";
import ImageUI from "components/Image/Image";
import { changeDisplayPrices } from "utils/utils";

const Order = () => {
  const orders = useAppSelector((state: any) => {
    return state.order.current;
  });

  return (
    <div className='container mx-auto'>
      <div className='mx-40 mb-20'>
        <div className='mt-20 '>
          <h1 className='flex items-center justify-center font-bold  text-md lg:text-2xl uppercase'>
            Order
          </h1>
        </div>
        {orders.length > 0
          ? orders.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className=' border border-gray-500 text-gray-700 my-2 bg-scroll'>
                  <div className='grid grid-cols-8 p-4'>
                    <div className='w-20 h-20 col-span-1'>
                      <ImageUI photo={item.product[0].product.photo} />
                    </div>
                    <div className='col-span-7 flex justify-between items-center'>
                      <div>
                        <h2>{item.product[0].product.name}</h2>
                        <span className='block'>
                          Category:
                          {item.product[0].product.category.name}
                        </span>
                        <span className='block'>
                          Qty: {item.product[0].amount}
                        </span>
                        <span className='block'>Status: {item.status}</span>
                      </div>
                      <div className=''>
                        <span className='block'>
                          Price:{" "}
                          {changeDisplayPrices(item.product[0].product.price)}
                        </span>
                        <span className='block py-1 text-red-500'>
                          Sum:{" "}
                          {changeDisplayPrices(
                            item.product[0].product.price *
                              item.product[0].amount
                          )}{" "}
                        </span>
                        <ButtonUI1 text={"Contact Us"} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Order;
