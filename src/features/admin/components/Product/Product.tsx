import { Fragment } from "react";

const ProductList = ({
  handleShowFromCreate,
  handleShowFromEdit,
  handleShowDialogDelete,
}: any) => {
  return (
    <Fragment>
      <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
        <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
          <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b uppercase text-center">
            Products
          </div>
          <div className="p-3">
            <table className="table-responsive w-full rounded">
              <thead>
                <tr>
                  <th className="border w-1/4 px-4 py-2">Student Name</th>
                  <th className="border w-1/6 px-4 py-2">City</th>
                  <th className="border w-1/6 px-4 py-2">Course</th>
                  <th className="border w-1/6 px-4 py-2">Fee</th>
                  <th className="border w-1/7 px-4 py-2">Status</th>
                  <th className="border w-1/5 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Micheal Clarke</td>
                  <td className="border px-4 py-2">Sydney</td>
                  <td className="border px-4 py-2">MS</td>
                  <td className="border px-4 py-2">900 $</td>
                  <td className="border px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#0CE943"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex">
                      <span className="cursor-pointer  mx-1 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#0CE943"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                      <span
                        onClick={() => handleShowFromEdit(true)}
                        className="cursor-pointer  mx-1 "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="#0CE943"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span
                        onClick={() => handleShowDialogDelete(true)}
                        className="cursor-pointer  mx-1 "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="red"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Rickey Ponting</td>
                  <td className="border px-4 py-2">Sydney</td>
                  <td className="border px-4 py-2">MS</td>
                  <td className="border px-4 py-2">300 $</td>
                  <td className=" border px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 "
                      viewBox="0 0 20 20"
                      fill="red"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex">
                      <span className="cursor-pointer  mx-1 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#0CE943"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                      <span className="cursor-pointer  mx-1 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="#0CE943"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="cursor-pointer  mx-1 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="red"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="ml-[1%] flex gap-[60%] lg:gap-[70%] xl:gap-[81%]">
        <div onClick={() => handleShowFromCreate(true)}>
          <button className="bg-transparent hover:bg-green-500 text-[#48bb78] font-semibold hover:text-white py-2 px-4 border border-green hover:border-transparent rounded">
            Create
          </button>
        </div>
        <div className="inline-flex ">
          <button className="bg-gray-200 hover:bg-gray-500 text-gray-900 font-bold py-2 px-4 rounded-l shadow">
            Prev
          </button>
          <button className="bg-gray-200 hover:bg-gray-500 text-gray-900 font-bold py-2 px-4 rounded-r shadow">
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
