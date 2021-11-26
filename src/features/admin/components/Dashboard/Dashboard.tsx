import { changeDisplayPrices } from 'utils/utils';
import { Link } from 'react-router-dom';

export const DashboardList = ({ order, contact, product, money }) => {
	return (
		<div>
			<main className='bg-white-300 flex-1 p-3 overflow-hidden'>
				<div className='flex flex-col text-center'>
					<div className='flex flex-1 flex-col md:flex-row lg:flex-row mx-2'>
						<Link
							to='/admin/orders'
							className='
				shadow-lg
				bg-[#e46050]
				border-l-8
				hover:bg-[#d64230]
				border-[#d64231]
				mb-2
				p-2
				md:w-1/4
				mx-2
			  '>
							<div className='p-4 flex flex-col'>
								<span className='no-underline text-white text-2xl'>
									{order}
								</span>
								<span className='no-underline text-white text-lg uppercase'>
									Orders
								</span>
							</div>
						</Link>
						<Link
							to='/admin/complete-orders'
							className='
				shadow
				bg-[#51bcdb]
				border-l-8
				hover:bg-[#2cadd4]
				border-[#2cadd4]
				mb-2
				p-2
				md:w-1/4
				mx-2
			  '>
							<div className='p-4 flex flex-col'>
								<span className='no-underline text-white text-2xl'>
									{changeDisplayPrices(money)}
								</span>
								<span className='no-underline text-white text-lg uppercase'>
									Total money
								</span>
							</div>
						</Link>
						<Link
							to='/admin/contacts'
							className='
				shadow
				bg-[#f4ab43]
				border-l-8
				hover:bg-[#c37c16]
				border-[#c37c16]
				mb-2
				p-2
				md:w-1/4
				mx-2
			  '>
							<div className='p-4 flex flex-col'>
								<span className='no-underline text-white text-2xl'>
									{contact}
								</span>
								<span className='no-underline text-white text-lg uppercase'>
									Contacts
								</span>
							</div>
						</Link>
						<Link
							to='/admin/products'
							className='
				shadow
				bg-[#72b15a]
				border-l-8
				hover:bg-[#5D9547]
				border-[#5d9547]
				mb-2
				p-2
				md:w-1/4
				mx-2
			  '>
							<div className='p-4 flex flex-col'>
								<span className='no-underline text-white text-2xl'>
									{product}
								</span>
								<span className='no-underline text-white text-lg uppercase'>
									Total Products
								</span>
							</div>
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
};
