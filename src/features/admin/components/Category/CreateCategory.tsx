import React, { Fragment } from "react";

const CreateCategory = ({ handleShowFromCreate }: any) => {
  return (
    <Fragment>
      <div
        onClick={() => handleShowFromCreate(false)}
        className='absolute inset-0 opacity-25 bg-[#0c1402] '></div>
      <div className=' absolute w-[80%] top-[30%] md:left-20 lg:left-24 xl:left-32'>
        <section className='max-w-4xl p-6 mx-auto bg-[#9df0a8] rounded-md shadow-md dark:bg-gray-800 '>
          <h1 className='uppercase text-center text-xl font-bold text-white  dark:text-white'>
            create category
          </h1>
          <form>
            <div className=' mt-4 '>
              <div>
                <label className='text-white dark:text-gray-200' htmlFor='name'>
                  Name category
                </label>
                <input
                  id='name'
                  type='text'
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                />
              </div>
            </div>
            <div className='flex justify-end gap-3 mt-6'>
              <button
                onClick={() => handleShowFromCreate(false)}
                className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600'>
                Cancel
              </button>
              <button className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#26f0b3] rounded-md hover:bg-[#d9f82be5] focus:outline-none focus:bg-gray-600'>
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </Fragment>
  );
};
export default CreateCategory;
