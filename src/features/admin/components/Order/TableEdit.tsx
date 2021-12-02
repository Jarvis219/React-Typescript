import { Fragment } from 'react';
import { sortText } from 'utils/utils';

export const TableEdit = ({ data, handleDeleteProduct }: any) => {
	const handleDataItemProduct = (id: any) => {
		handleDeleteProduct({
			_id: data._id,
			product: data.product.filter((item: any) => item !== id)
				? data.product.filter((item: any) => item !== id)
				: [],
			data_id: id.product._id,
		});
	};
	return (
		<Fragment>
			<table className='w-full mt-5 text-white'>
				<thead>
					<tr>
						<th className='px-2 py-1 border border-white'>Name</th>
						<th className='px-2 py-1 border border-white'>Photo</th>
						<th className='px-2 py-1 border border-white'>price</th>
						<th className='px-2 py-1 border border-white'>Qty</th>
						<th className='px-2 py-1 border border-white'>Total</th>
						<th className='px-2 py-1 border border-white'>Remove</th>
					</tr>
				</thead>
				<tbody>
					{data.product.map((item: any, index: number) => {
						return (
							<tr
								key={index}
								id={`remove-${item.product._id}`}
								className='text-center '>
								<td className='px-2 py-1 border border-white'>
									{sortText(item.product.name, 0, 30)}
								</td>
								<td className='px-2 py-1 border border-white'>
									<img
										src={item.product.photo}
										width={40}
										className='mx-auto rounded-md'
										alt=''
									/>
								</td>
								<td className='px-2 py-1 border border-white'>
									$ {item.product.price}
								</td>

								<td className='px-2 py-1 border border-white'>{item.amount}</td>
								<td className='px-2 py-1 border border-white'>
									$
									<span className='total-order-detail'>
										{item.product.price * item.amount}
									</span>
								</td>
								<td className='px-2 py-1 border border-white '>
									<span
										onClick={() => handleDataItemProduct(item)}
										className='cursor-pointer   transform scale-100 hover:scale-125 transition duration-300   '>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6 mx-auto'
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
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</Fragment>
	);
};
