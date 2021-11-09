import { useAppSelector } from "app/hook";
import { OrderModel } from "models/order";
import { Fragment, memo, useEffect, useState } from "react";
import { changeDisplayPrices } from "utils/utils";

const OrderDetail = ({ id, setOrder }: any) => {
  const orders = useAppSelector((state: any) => {
    return state.order.current;
  });
  const [data, setData] = useState<OrderModel | null>(null);
  const [sum, setSum] = useState<number>(0);
  useEffect(() => {
    orders.forEach((item: any) => {
      if (item._id === id) {
        setData(item);
      }
    });
    return () => setData(null);
  }, [data, id, orders]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const arr: any = [];
    const orderNode = document.querySelectorAll(".total-order-detail");
    if (orderNode.length > 0) {
      const reducer = (previousValue: number, currentValue: number) =>
        previousValue + currentValue;
      orderNode.forEach((element) => {
        arr.push(+element.innerHTML);
      });

      setSum(arr.reduce(reducer));
    }
  });
  return (
    <Fragment>
      {data ? (
        <Fragment>
          <div
            onClick={() => setOrder(false)}
            className="absolute inset-0 opacity-25 bg-[#0c1402] "
          ></div>
          <div className=" absolute w-[80%] top-[30%] md:left-20 lg:left-24 xl:left-32">
            <section className="max-w-4xl p-6 mx-auto bg-[#9df0a8] rounded-md shadow-md dark:bg-gray-800 ">
              <h1 className="uppercase text-center text-xl font-bold text-white  dark:text-white">
                Order detail
              </h1>
              <div className="grid grid-cols-8 gap-3">
                <div className="col-span-3">
                  <div className="flex gap-3">
                    <div>
                      <span className="block">Name</span>
                      <span className="block">Phone</span>
                      <span className="block">Address</span>
                      <span className="block">Note</span>
                      <span className="block">Pay</span>
                    </div>
                    <div>
                      <span className="block">: {data.name}</span>
                      <span className="block">: {data.phone}</span>
                      <span className="block">: {data.address}</span>
                      <span className="block">: {data.note}</span>
                      <span className="block">: {data.pay}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-5">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 border border-blue-500">
                          Name
                        </th>
                        <th className="px-2 py-1 border border-blue-500">
                          Photo
                        </th>
                        <th className="px-2 py-1 border border-blue-500">
                          price
                        </th>
                        <th className="px-2 py-1 border border-blue-500">
                          Sale
                        </th>
                        <th className="px-2 py-1 border border-blue-500">
                          Qty
                        </th>
                        <th className="px-2 py-1 border border-blue-500">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.product.map((item: any, index: number) => {
                        return (
                          <tr className="text-center" key={index}>
                            <td className="px-2 py-1 border border-blue-500">
                              {item.product.name}
                            </td>
                            <td className="px-2 py-1 border border-blue-500">
                              <img
                                src={item.product.photo}
                                width={25}
                                className="mx-auto"
                                alt=""
                              />
                            </td>
                            <td className="px-2 py-1 border border-blue-500">
                              ${item.product.price}
                            </td>
                            <td className="px-2 py-1 border border-blue-500">
                              ${item.product.sale}
                            </td>
                            <td className="px-2 py-1 border border-blue-500">
                              ${item.amount}
                            </td>
                            <td className="px-2 py-1 border border-blue-500">
                              $
                              <span className="total-order-detail">
                                {(item.product.price - item.product.sale) *
                                  item.amount}
                              </span>
                            </td>
                          </tr>
                        );
                      })}

                      <tr className="text-center">
                        <td
                          colSpan={2}
                          className="px-2 py-1 border border-blue-500 font-bold"
                        >
                          SUM
                        </td>
                        <td
                          colSpan={4}
                          className="px-2 py-1 border border-blue-500 text-red-500 font-bold"
                        >
                          {changeDisplayPrices(sum)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                onClick={() => setOrder(false)}
                className="mt-4 flex justify-end"
              >
                <button
                  type="button"
                  className="bg-transparent hover:bg-green-500 text-[#19b4c9] font-semibold hover:text-white py-2 px-8 border border-green hover:border-transparent rounded"
                >
                  Ok
                </button>
              </div>
            </section>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default memo(OrderDetail);
