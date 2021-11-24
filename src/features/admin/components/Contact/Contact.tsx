import ButtonUI1 from "components/Button/Button";
import { ColorBackground } from "constants/color";
import { Fragment } from "react";
import ContactStatus from "./ContactStatus";

const ContactList = ({
  contacts,
  handleShowDialogDelete,
  handleUpdateContact,
}) => {
  return (
    <Fragment>
      <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2 text-center">
        <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
          <div
            style={{ backgroundColor: ColorBackground.blue }}
            className="font-bold text-white px-2 py-3 border-solid  border-b uppercase text-center"
          >
            contacts
          </div>
          <div className="p-3">
            <table className="table-responsive w-full rounded">
              <thead>
                <tr>
                  <th className="border w-1/7 px-4 py-2">STT</th>
                  <th className="border w-1/2 px-4 py-2">Name</th>
                  <th className="border w-1/2 px-4 py-2">Email</th>
                  <th className="border w-1/2 px-4 py-2">Phone</th>
                  <th className="border w-1/2 px-4 py-2">Content</th>
                  <th className="border w-1/2 px-4 py-2">Status</th>
                  <th className="border w-1/2 px-4 py-2">Order</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {contacts ? (
                  contacts.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">{item.email}</td>
                        <td className="border px-4 py-2">0{item.phone}</td>
                        <td className="border px-4 py-2">{item.content}</td>
                        <td className="border px-4 py-2">
                          <ContactStatus
                            statusItem={item.status}
                            data={item}
                            handleUpdateContact={handleUpdateContact}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <div className="flex justify-center items-center">
                            <span
                              onClick={() =>
                                handleShowDialogDelete({
                                  status: true,
                                  id: item._id,
                                })
                              }
                              className="cursor-pointer transform scale-100 hover:scale-125 transition duration-300  mx-1 "
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
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3}>not categories</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <div className="inline-flex h-10">
          <ButtonUI1
            size={"sm"}
            color={"lightBlue"}
            className={"mx-1"}
            text={"Prev"}
          />
          <ButtonUI1
            size={"sm"}
            color={"lightBlue"}
            className={"mx-1"}
            text={"Next"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ContactList;
