import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { OrderStatus } from 'constants/order';
import { ProductPagination } from 'constants/product';
import { OrderList } from 'features/admin/components/Order/Order';
import { OrderModel } from 'models/order';
import EditOrder from '../../components/Order/EditOrder';
import {
	DisabledProductPaginationType,
	ProductModel,
	ProductPaginationType,
} from 'models/product';
import { useEffect, useState } from 'react';
import { notifyError, notifySuccess, Pagination } from 'utils/utils';
import { UpdateOrder } from './OrderSlice';

const Order = () => {
	const dispatch = useAppDispatch();
	const orders = useAppSelector((state: any) => {
		return state.order.current;
	});
	const [showEdit, setShowEdit] =
		useState<{ type: boolean; action?: OrderModel }>();
	const [loading, setLoading] = useState<boolean>(false);
	const [pagination, setPagination] = useState<Pagination>({
		limit: 0,
		skip: 3,
	});
	const [disablePagination, setDisablePagination] =
		useState<DisabledProductPaginationType>({
			action: ProductPagination.minus,
			status: true,
		});
	const [orderState, setOrderState] = useState<OrderModel>();
	const [countPage, setCountPage] = useState<number>(() => {
		let sum = 0;
		orders.forEach((item: any) => {
			if (
				item.status !== OrderStatus.cancelled &&
				item.status !== OrderStatus.complete
			) {
				sum += 1;
			}
		});
		return sum;
	});

	useEffect(() => {
		const arr: any = [];
		orders.forEach((item: any) => {
			if (
				item.status !== OrderStatus.cancelled &&
				item.status !== OrderStatus.complete
			) {
				arr.push(item);
			}
		});
		setOrderState(arr.slice(pagination.limit, pagination.skip));
	}, [pagination, countPage, orders, dispatch]);

	const handleUpdateStatusOrder = async (data: OrderModel): Promise<void> => {
		try {
			const actionResult: any = await dispatch(UpdateOrder(data));
			const currentProduct = unwrapResult(actionResult);
			if (
				currentProduct.data.status === OrderStatus.cancelled ||
				currentProduct.data.status === OrderStatus.complete
			) {
				setCountPage((pre) => (pre -= 1));
			}
			notifySuccess(currentProduct.message + ' 👌');
		} catch (error) {
			notifyError('Update status order failure !!!');
		}
	};

	const handlePagination = (action: ProductPaginationType): void => {
		if (action.type === ProductPagination.plus) {
			setPagination((pre): any => {
				setDisablePagination({
					action: ProductPagination.minus,
					status: false,
				});

				if (pre.skip >= countPage - 3) {
					setDisablePagination({
						action: ProductPagination.plus,
						status: true,
					});
				}
				return Object.assign({}, pre, {
					skip: pre.skip + 3,
					limit: pre.limit + 3,
				});
			});
		} else {
			setPagination((pre): any => {
				if (pre.limit <= 2) {
					setDisablePagination({
						action: ProductPagination.minus,
						status: true,
					});
					pre.limit = 0;
					pre.skip = 3;
					return pre;
				}
				return Object.assign({}, pre, {
					skip: pre.skip - 3,
					limit: pre.limit - 3,
				});
			});
		}
	};

	const handleUpdate = async (data: {
		name: string;
		address: string;
		phone: number;
	}): Promise<void> => {
		setLoading(true);
		try {
			const actionResult: any = await dispatch(UpdateOrder(data));
			const currentProduct = unwrapResult(actionResult);
			notifySuccess(currentProduct.message + ' 👌');
		} catch (error) {
			notifyError('Update  order failure !!!');
		}
		setLoading(false);
	};

	const handleDeleteProduct = async (data: {
		id: string;
		product: ProductModel[];
		status?: string;
		data_id?: string;
	}): Promise<void> => {
		if (data.product.length === 0) {
			data.status = OrderStatus.cancelled;
			setShowEdit({ type: false });
		}

		setLoading(true);
		try {
			const actionResult: any = await dispatch(UpdateOrder(data));
			const currentProduct = unwrapResult(actionResult);
			if (data.product.length > 0) {
				setShowEdit({ type: true, action: currentProduct.data });
			}
			notifySuccess(currentProduct.message + ' 👌');
		} catch (error) {
			notifyError('Update  order failure !!!');
		}
		setLoading(false);
	};

	return (
		<div>
			{orders.length !== 0 ? (
				<OrderList
					setShowEdit={setShowEdit}
					handlePagination={handlePagination}
					disablePagination={disablePagination}
					handleUpdateStatusOrder={handleUpdateStatusOrder}
					orderState={orderState}
				/>
			) : (
				''
			)}
			{showEdit?.type ? (
				<EditOrder
					handleUpdate={handleUpdate}
					handleDeleteProduct={handleDeleteProduct}
					data={showEdit.action}
					loading={loading}
					setShowEdit={setShowEdit}
				/>
			) : (
				''
			)}
		</div>
	);
};

export default Order;
