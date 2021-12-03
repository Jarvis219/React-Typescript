import { useAppSelector } from 'app/hook';
import ButtonUI1 from 'components/Button/Button';
import ImageUI from 'components/Image/Image';
import { OrderModel } from 'models/order';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changeDisplayPrices, getUser } from 'utils/utils';

const Order = () => {
	const orders = useAppSelector((state: any) => {
		return state.order.current;
	});

	const { email } = getUser();
	const [order, setOrder] = useState<OrderModel[]>();
	useEffect(() => {
		setOrder(orders.filter((item) => item.email === email));
	}, [email, orders]);
	return (
		<div className='container mx-auto'>
			<div className='mx-40 mb-20'>
				<div className='mt-20 '>
					<h1 className='flex items-center justify-center font-bold  text-md lg:text-2xl uppercase'>
						Order
					</h1>
				</div>
				{order && order.length > 0
					? // eslint-disable-next-line array-callback-return
					  order.map((item: any, index: number) => {
							return item.product.map((productItem, index) => {
								return (
									<div
										key={index}
										className=' border border-gray-500 text-gray-700 my-2 bg-scroll'>
										<div className='grid grid-cols-8 p-4'>
											<div className='w-20 h-20 col-span-1'>
												<ImageUI photo={productItem.product.photo} />
											</div>
											<div className='col-span-7 flex justify-between items-center'>
												<div>
													<h2>{productItem.product.name}</h2>
													<span className='block'>
														Category:
														{productItem.product.category.name}
													</span>
													<span className='block'>
														Qty: {productItem.amount}
													</span>
													<span className='block'>Status: {item.status}</span>
												</div>
												<div className=''>
													<span className='block'>
														Price:{' '}
														{changeDisplayPrices(productItem.product.price)}
													</span>
													<span className='block py-1 text-red-500'>
														Sum:{' '}
														{changeDisplayPrices(
															productItem.product.price * productItem.amount
														)}{' '}
													</span>
													<Link to='/contact'>
														{' '}
														<ButtonUI1 text={'Contact Us'} />
													</Link>
												</div>
											</div>
										</div>
									</div>
								);
							});
					  })
					: ''}
			</div>
		</div>
	);
};

export default Order;
