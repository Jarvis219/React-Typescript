/* eslint-disable react-hooks/exhaustive-deps */
import { ColorBackground } from "constants/color";
import { useEffect } from "react";
import { sortText } from "utils/utils";
import { useForm, SubmitHandler } from "react-hook-form";
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

  const handleDataItemProduct = (id) => {
    handleDeleteProduct({
      _id: data._id,
      product: data.product.filter((item: any) => item !== id)
        ? data.product.filter((item: any) => item !== id)
        : [],
    });
  };
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
                  {...register("name", { required: true, maxLength: 50 })}
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
                  {...register("phone", { required: true, maxLength: 15 })}
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
                  {...register("address", { required: true, maxLength: 200 })}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  defaultValue={""}
                />
                {errors.name && (
                  <span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
                    This field is required & maximum 200 characters
                  </span>
                )}
              </div>
            </div>
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
                    <tr key={index} className='text-center '>
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

                      <td className='px-2 py-1 border border-white'>
                        {item.amount}
                      </td>
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
                Create
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditOrder;
