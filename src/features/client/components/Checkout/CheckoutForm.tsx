import { Fragment, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUser } from "utils/utils";
type Inputs = {
  name: string;
  email: string;
  address: string;
  note: string;
  phone: number;
  price: number;
  pay: string;
};
export const CheckoutForm = ({ handleOrder, loading }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleCheckout: SubmitHandler<Inputs> = (data: Inputs) => {
    handleOrder(data);
  };
  useEffect(() => {
    reset({
      email: getUser().email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(handleCheckout)}
        className='justify-center w-full mx-auto'>
        <div>
          <div className='mt-4'>
            <div className='w-full'>
              <label
                htmlFor='Email'
                className='block mb-3 text-sm font-semibold text-gray-500'>
                Email
              </label>
              <input
                disabled
                {...register("email", { required: true, maxLength: 50 })}
                type='text'
                placeholder='Email'
                className='w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600'
              />
            </div>
          </div>
          <div className='space-x-0 lg:flex lg:space-x-4'>
            <div className='w-full lg:w-1/2'>
              <label
                htmlFor='name'
                className='block mb-3 text-sm font-semibold text-gray-500'>
                Name
              </label>
              <input
                type='text'
                placeholder='Name'
                className='w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600'
                {...register("name", { required: true, maxLength: 50 })}
              />
              {errors.name && (
                <span className='text-[#f12424] font-serif text-xs block my-1 -mb-3 '>
                  This field is required & maximum 50 characters
                </span>
              )}
            </div>
            <div className='w-full lg:w-1/2 '>
              <label
                htmlFor='phone'
                className='block mb-3 text-sm font-semibold text-gray-500'>
                Phone
              </label>
              <input
                type='tel'
                placeholder='Phone'
                className='w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600'
                {...register("phone", { required: true, maxLength: 15 })}
              />
              {errors.phone && (
                <span className='text-[#f12424] font-serif text-xs block my-1 -mb-3 '>
                  This field is required & maximum 15 characters
                </span>
              )}
            </div>
          </div>

          <div className='mt-4'>
            <div className='w-full'>
              <label
                htmlFor='Address'
                className='block mb-3 text-sm font-semibold text-gray-500'>
                Address
              </label>
              <textarea
                className='w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600'
                cols={20}
                rows={4}
                placeholder='Address'
                defaultValue={""}
                {...register("address", { required: true, maxLength: 200 })}
              />
              {errors.address && (
                <span className='text-[#f12424] font-serif text-xs block my-1 -mb-1 '>
                  This field is required & maximum 200 characters
                </span>
              )}
            </div>
          </div>

          <div className='relative pt-4 xl:pt-6'>
            <label
              htmlFor='note'
              className='block mb-3 text-sm font-semibold text-gray-500'>
              {" "}
              Notes (Optional)
            </label>
            <textarea
              className='flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600'
              rows={4}
              placeholder='Notes for delivery'
              defaultValue={""}
              {...register("note", { maxLength: 300 })}
            />
            {errors.name && (
              <span className='text-[#f12424] font-serif text-xs block my-1 -mb-3 '>
                Maximum 300 characters
              </span>
            )}
          </div>
          <div className='space-x-0 lg:flex lg:space-x-4 mt-4'>
            <div className='flex items-center mr-4 mb-4'>
              <input
                id='radio1'
                type='radio'
                className='hidden'
                value='Payment on delivery'
                defaultChecked
                {...register("pay")}
              />
              <label
                htmlFor='radio1'
                className='flex items-center cursor-pointer'>
                <span className='w-4 h-4 inline-block mr-1 border border-grey' />
                Payment on delivery
              </label>
            </div>
            <div className='flex items-center mr-4 mb-4'>
              <input
                id='radio2'
                type='radio'
                value='Bank transfer'
                className='hidden'
                {...register("pay")}
              />
              <label
                htmlFor='radio2'
                className='flex items-center cursor-pointer'>
                <span className='w-4 h-4 inline-block mr-1 border border-grey' />
                Bank transfer
              </label>
            </div>
          </div>
          <div className='mt-4 relative'>
            <button
              disabled={loading}
              type='submit'
              className='w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900 uppercase'>
              {loading && (
                <div className='flex items-center justify-center absolute top-2 left-[41%]'>
                  <div className='w-5 h-5 border-t-2 z-50 border-b-2 border-red-500 rounded-full animate-spin'></div>
                </div>
              )}
              Order
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
