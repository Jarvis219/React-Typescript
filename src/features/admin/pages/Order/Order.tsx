import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hook";
import { OrderList } from "features/admin/components/Order/Order";
import { OrderModel } from "models/order";
import { notifyError, notifySuccess } from "utils/utils";
import { UpdateOrder } from "./OrderSlice";

const Order = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: any) => {
    return state.order.current;
  });

  const handleUpdateStatusOrder = async (data: OrderModel): Promise<void> => {
    try {
      const actionResult: any = await dispatch(UpdateOrder(data));
      const currentProduct = unwrapResult(actionResult);
      notifySuccess(currentProduct.message + " 👌");
    } catch (error) {
      notifyError("Update status order failure !!!");
    }
  };

  return (
    <div>
      {orders.length !== 0 ? (
        <OrderList
          handleUpdateStatusOrder={handleUpdateStatusOrder}
          orders={orders}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Order;
