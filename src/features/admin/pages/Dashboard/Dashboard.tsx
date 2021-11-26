import { useAppSelector } from 'app/hook';
import { OrderStatus } from 'constants/order';
import { ChartDashboard } from 'features/admin/components/Dashboard/Chart';
import { DashboardList } from 'features/admin/components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { sumTotal } from 'utils/utils';

const Dashboard = () => {
	const [money, setMoney] = useState<number>(0);
	const products = useAppSelector((state: any) => state.product.current.length);
	const orders = useAppSelector((state: any) => state.order.current);
	const contacts = useAppSelector((state: any) => state.contact.current.length);
	useEffect(() => {
		let arr: any = [];
		orders.forEach((item) => {
			if (item.status === OrderStatus.complete) {
				arr.push(item.price);
			}
		});

		setMoney(sumTotal(arr));
	}, [orders]);

	return (
		<div>
			<DashboardList
				product={products}
				money={money}
				order={orders.length}
				contact={contacts}
			/>
			<ChartDashboard orders={orders} />
		</div>
	);
};
export default Dashboard;
