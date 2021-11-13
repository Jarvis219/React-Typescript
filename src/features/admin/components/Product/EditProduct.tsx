import { ColorBackground } from "constants/color";
import { Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CategoryItem from "../Category/CategoryItem";

type Inputs = {
  name: string;
  price: number;
  quantity: number;
  sale: number;
  category: string;
  description: string;
  status: string;
  photo: File;
};
const EditProduct = ({
  handleShowFromEdit,
  dataEdit,
  handleEditSubmit,
  loading,
}: any) => {
  let { data } = dataEdit;
  const [avatar, setAvatar] = useState<any>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (dataForm: Inputs) => {
    const { photo }: any = dataForm;
    if (photo.length === 0) {
      dataForm.photo = data.photo;
      handleEditSubmit(Object.assign({}, data, dataForm));
    } else {
      handleEditSubmit(Object.assign({}, data, dataForm));
    }
  };
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handlePreviewPhoto = (e: any) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };

  useEffect(() => {
    reset({
      name: data.name,
      price: data.price,
      sale: data.sale,
      quantity: data.quantity,
      description: data.description,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <Fragment>
      <div
        onClick={() => handleShowFromEdit(false)}
        className=' fixed inset-0 opacity-25 bg-[#0c1402]  '></div>
      <div className='absolute w-[70%]  top-[7%] left-20  md:left-32 lg:left-40 xl:left-56'>
        <section
          style={{ backgroundColor: ColorBackground.blue }}
          className=' p-6   rounded-md shadow-md dark:bg-gray-800 '>
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
                  type='text'
                  {...register("name", { required: true, maxLength: 80 })}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                />
                {errors.name && (
                  <span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
                    This field is required & maximum 80 characters
                  </span>
                )}
              </div>
              <div>
                <label
                  className='text-white dark:text-gray-200'
                  htmlFor='price'>
                  Price ($)
                </label>
                <input
                  id='price'
                  type='number'
                  {...register("price", { required: true, min: 0 })}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                />
                {errors.price && (
                  <span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
                    This field is required & minimum value is 0
                  </span>
                )}
              </div>
              <div>
                <label
                  className='text-white dark:text-gray-200'
                  htmlFor='quantity'>
                  quantity
                </label>
                <input
                  id='quantity'
                  type='number'
                  {...register("quantity", { required: true, min: 1 })}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                />
                {errors.quantity && (
                  <span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
                    This field is required & minimum value is 1
                  </span>
                )}
              </div>
              <div>
                <label className='text-white dark:text-gray-200' htmlFor='sale'>
                  sale
                </label>
                <input
                  id='sale'
                  type='number'
                  {...register("sale", { min: 0 })}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                />
                {errors.sale && (
                  <span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
                    {" "}
                    Minimum value is 0
                  </span>
                )}
              </div>
              <div>
                <label
                  className='text-white dark:text-gray-200'
                  htmlFor='category'>
                  Category
                </label>

                <select
                  autoFocus
                  {...register("category", { required: true })}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'>
                  <CategoryItem itemCategory={data.category} />
                </select>
                {errors.category && (
                  <span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label
                  className='text-white dark:text-gray-200'
                  htmlFor='description'>
                  Description
                </label>
                <textarea
                  id='description'
                  {...register("description", {
                    required: true,
                    maxLength: 2000,
                  })}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  defaultValue={""}
                />
                {errors.category && (
                  <span className='text-[#f33d25] pt-3 font-serif text-xs block -mb-4 '>
                    This field is required & Maxlength 2000 characters!!
                  </span>
                )}
              </div>
              <div className='col-span-2'>
                <label className='block text-sm font-medium text-white'>
                  Image
                </label>
                <div className='relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                  {avatar ? (
                    <img
                      src={avatar.preview}
                      className='absolute top-1 xl:left-[42%]'
                      style={{ maxWidth: "70px" }}
                      alt=''
                    />
                  ) : (
                    <img
                      src={data.photo}
                      className='absolute top-1 xl:left-[42%]'
                      style={{ maxWidth: "70px" }}
                      alt=''
                    />
                  )}
                  <div className=' space-y-1 text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-white'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'>
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <div className='flex text-sm text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
                        <span>Upload a file</span>
                        <input
                          id='file-upload'
                          className='sr-only'
                          type='file'
                          {...register("photo")}
                          onChange={handlePreviewPhoto}
                        />
                      </label>

                      <p className='pl-1 text-white'>or drag and drop</p>
                    </div>
                    <p className='text-xs text-white'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-end gap-3 mt-6'>
              <button
                onClick={() => handleShowFromEdit(false)}
                className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md shadow-lg hover:bg-pink-700 focus:outline-none focus:bg-gray-600'>
                Cancel
              </button>
              <button
                disabled={loading}
                className='px-8 py-3 shadow-lg leading-5 text-white transition-colors duration-200 transform bg-[#03a9f4] rounded-md hover:bg-[#0691d1] focus:outline-none focus:bg-gray-600'>
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
    </Fragment>
  );
};
export default EditProduct;
