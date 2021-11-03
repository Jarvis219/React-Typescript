import { memo } from "react";
const textFont = {
  fontFamily: "Roboto",
};

const ConfirmButton = ({ handleShowDialogDelete, handleConFirm }: any) => {
  return (
    <div>
      <div style={textFont}>
        <div>
          <div className='z-9 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed'>
            <div
              className='z-10 relative p-3 mx-auto my-0 max-w-full'
              style={{ width: "500px" }}>
              <div className='bg-white rounded shadow-lg border flex flex-col overflow-hidden px-10 py-10'>
                <div className='flex justify-center'>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-24 w-24'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#f56565'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </span>
                </div>
                <div className='text-center py-6 text-2xl text-gray-700'>
                  Are you sure ?
                </div>
                <div className='text-center font-light text-gray-700 mb-8'>
                  Do you really want to delete these records? This process
                  cannot be undone.
                </div>
                <div className='flex justify-center'>
                  <button
                    onClick={() => handleConFirm(false)}
                    className='bg-gray-300 text-gray-900 rounded hover:bg-gray-200 px-6 py-2 focus:outline-none mx-1'>
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConFirm(true)}
                    className='bg-red-500 text-gray-200 rounded hover:bg-red-400 px-6 py-2 focus:outline-none mx-1'>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleShowDialogDelete(false)}
              className='z-9 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmButton);
