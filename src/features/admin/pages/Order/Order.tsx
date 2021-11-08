import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hook";
import { OrderList } from "features/admin/components/Order/Order";
import { OrderModel } from "models/order";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess, Pagination } from "utils/utils";
import { ListOrder, UpdateOrder } from "./OrderSlice";

const Order = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: any) => {
    return state.order.current;
  });
  const [pagination, setPagination] = useState<Pagination>({
    limit: 0,
    skip: 0,
  });
  console.log(orders);

  const handleUpdateStatusOrder = async (data: OrderModel): Promise<void> => {
    try {
      const actionResult: any = await dispatch(UpdateOrder(data));
      const currentProduct = unwrapResult(actionResult);
      await getOrder(pagination);
      notifySuccess(currentProduct.message + " 👌");
    } catch (error) {
      notifyError("Update status order failure !!!");
    }
  };

  useEffect(() => {
    getOrder(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const getOrder = async (paginationL: Pagination): Promise<void> => {
    try {
      const actionResult: any = await dispatch(ListOrder(pagination));
      unwrapResult(actionResult);
    } catch (error) {
      console.log(error);
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
