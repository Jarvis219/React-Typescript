/* eslint-disable react-hooks/exhaustive-deps */
import { ColorBackground } from 'constants/color';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TableEdit } from './TableEdit';
type Inputs = {
	_id: string;
	name: string;
	address: string;
	phone: number;
};

const EditOrder = ({
	setShowEdit,
	data,
	loading,
	handleUpdate,
	handleDeleteProduct,
}: any) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (dataForm: Inputs) => {
		handleUpdate(dataForm);
	};

	useEffect(() => {
		reset({
			_id: data._id,
			name: data.name,
			address: data.address,
			phone: data.phone,
		});
	}, [data]);

	return (
		<div>
			<div
				onClick={() => setShowEdit({ type: false })}
				className='fixed inset-0 opacity-25 bg-[#0c1402] '></div>
			<div className='absolute w-[80%]  top-[7%] left-16  md:left-24 lg:left-32 xl:left-40'>
				<section
					style={{ backgroundColor: ColorBackground.blue }}
					className=' p-6  rounded-md shadow-md dark:bg-gray-800 0'>
					<h1 className='uppercase text-center text-xl font-bold text-white  dark:text-white'>
						create product
					</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
							<div>
								<label className='text-white dark:text-gray-200' htmlFor='name'>
									Name
								</label>
								<input
									id='name'
									{...register('name', { required: true, maxLength: 50 })}
									type='text'
									className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
								/>

								{errors.name && (
									<span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
										This field is required & maximum 50 characters
									</span>
								)}
							</div>
							<div>
								<label
									className='text-white dark:text-gray-200'
									htmlFor='phone'>
									Phone
								</label>
								<input
									id='phone'
									{...register('phone', { required: true, maxLength: 15 })}
									type='number'
									className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
								/>
								{errors.name && (
									<span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
										This field is required & maximum 15 characters
									</span>
								)}
							</div>
							<div className='col-span-2'>
								<label
									className='text-white dark:text-gray-200'
									htmlFor='address'>
									Address
								</label>
								<textarea
									id='address'
									{...register('address', { required: true, maxLength: 200 })}
									className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
									defaultValue={''}
								/>
								{errors.name && (
									<span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
										This field is required & maximum 200 characters
									</span>
								)}
							</div>
						</div>
						<TableEdit data={data} handleDeleteProduct={handleDeleteProduct} />
						<div className='relative flex justify-end gap-3 mt-6'>
							<button
								disabled={loading}
								onClick={() => setShowEdit({ type: false })}
								className='px-6 py-2 leading-5 text-white transition-colors duration-200 shadow-lg transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600'>
								Cancel
							</button>
							<button
								disabled={loading}
								className='px-8 py-3 leading-5 text-white transition-colors duration-200 transform bg-[#03a9f4] rounded-md hover:bg-[#0691d1] shadow-lg focus:outline-none focus:bg-gray-600'>
								{loading && (
									<div className='flex items-center justify-center absolute top-2 left-2'>
										<div className='w-5 h-5 border-t-2 border-b-2 border-red-600 rounded-full animate-spin'></div>
									</div>
								)}
								Update
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
};

export default EditOrder;
