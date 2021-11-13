/* eslint-disable array-callback-return */
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hook";
import ButtonUI1 from "components/Button/Button";
import { ColorBackground } from "constants/color";
import { OrderStatus } from "constants/order";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { OrderModel } from "models/order";
import { Fragment, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "utils/utils";
import { RemoveOrder } from "./OrderSlice";
const OrderDetail = lazy(() => import("../../components/Order/OrderDetail"));

const CompleteOrder = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: any) => {
    return state.order.current;
  });
  const [diaLog, setDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [order, setOrder] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const handleOrderdetail = (id: string): void => {
    setOrder(true);
    setId(id);
  };

  const handleShowDialogDelete = (status: boolean, data: OrderModel) => {
    setIdDelete(data._id!);
    setDialog(status);
  };

  const handleConFirm = async (data: boolean): Promise<void> => {
    if (data) {
      deleteOrder();
    }
    setDialog(false);
  };

  const deleteOrder = async (): Promise<void> => {
    try {
      if (!idDelete) return;
      setLoading(true);
      const actionResult: any = await dispatch(RemoveOrder(idDelete));
      const currentCategory = unwrapResult(actionResult);
      setLoading(false);
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      setLoading(false);
      notifyError("Delete product failure !!!");
    }
  };

  return (
    <Fragment>
      <div className='flex flex-1  flex-col md:flex-row lg:flex-row mx-2 text-center'>
        <div className='mb-2 border-solid border-gray-300 rounded border shadow-sm w-full'>
          <div
            style={{ backgroundColor: ColorBackground.blue }}
            className='relative text-white font-bold px-2 py-3 border-solid  border-b uppercase text-center'>
            <div className='absolute top-3 right-[5%]'>
              <Link to='/admin/trash-orders'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 hover:text-[#6af78d] text-[#dd4b27]'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </Link>
            </div>
            Order complete
          </div>

          <div className='p-3'>
            <table className='table-responsive w-full rounded'>
              <thead>
                <tr>
                  <th className='border w-1/5 px-4 py-2'>Name</th>
                  <th className='border w-1/6 px-4 py-2'>Email</th>
                  <th className='border w-1/6 px-4 py-2'>Phone</th>
                  <th className='border w-1/6 px-4 py-2'>Address</th>
                  <th className='border w-1/6 px-4 py-2'>Status</th>
                  <th className='border w-1/6 px-4 py-2'>Active</th>
                </tr>
              </thead>
              <tbody className='text-gray-800'>
                {orders.map((item: any, index: number) => {
                  if (item.status === OrderStatus.complete) {
                    return (
                      <tr key={index}>
                        <td className='border px-4 py-2'>{item.name}</td>
                        <td className='border px-4 py-2'>{item.email}</td>
                        <td className='border px-4 py-2'>0{item.phone}</td>
                        <td className='border px-4 py-2'> {item.address}</td>
                        <td className='border px-4 py-2 font-bold text-green-400'>
                          {item.status}
                        </td>

                        <td className='border px-4 py-2'>
                          <div className='flex justify-center items-center'>
                            <span
                              onClick={() => handleOrderdetail(item._id)}
                              className='cursor-pointer  mx-1 '>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-7 w-7'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke={ColorBackground.blue}>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                />
                              </svg>
                            </span>
                            <span
                              onClick={() => handleShowDialogDelete(true, item)}
                              className='cursor-pointer  mx-1 '>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='red'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                />
                              </svg>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {diaLog ? (
        <ConfirmButton
          loading={loading}
          handleConFirm={handleConFirm}
          handleShowDialogDelete={handleShowDialogDelete}
        />
      ) : (
        ""
      )}
      {order && id ? <OrderDetail id={id} setOrder={setOrder} /> : ""}
      <div className='absolute  xl:bottom-[35%] xl:right-[2%]   sm:bottom-[30%] sm:right-[1.5%] sm:w-[80%] flex justify-end'>
        <div className='inline-flex  '>
          <ButtonUI1
            size={"md"}
            color={"lightBlue"}
            className={"mx-1"}
            text={"Prev"}
          />
          <ButtonUI1
            size={"sm"}
            color={"lightBlue"}
            className={"mx-1"}
            text={"Next"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CompleteOrder;
