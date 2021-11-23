import { ContactModel } from "models/Contact";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const FormContact = ({ handleSen }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactModel>();

  const send: SubmitHandler<ContactModel> = (data: ContactModel) => {
    handleSen(Object.assign(data, { status: "Not Seen" }));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(send)} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Name
            </label>
            <input
              {...register("name", { required: true, maxLength: 30 })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
            />
            {errors.name && (
              <span className="text-[#f12424] italic font-serif text-xs block mt-2 -mb-4 ">
                This field is required & maximum 30 characters
              </span>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Phone
            </label>
            <input
              {...register("phone", { required: true, maxLength: 12 })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-last-name"
              type="tel"
              placeholder="Doe"
            />
            {errors.phone && (
              <span className="text-[#f12424] italic font-serif text-xs block mt-2 -mb-4 ">
                This field is required & maximum 12 characters
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              E-mail
            </label>
            <input
              {...register("email", { required: true, maxLength: 50 })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="email"
              type="email"
            />
          </div>
          {errors.email && (
            <span className="text-[#f12424] italic font-serif text-xs block mt-2 -mb-4 ">
              This field is required & maximum 50 characters
            </span>
          )}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Message
            </label>
            <textarea
              {...register("content", { required: true, maxLength: 300 })}
              className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message"
              defaultValue={""}
            />
            {errors.content && (
              <span className="text-[#f12424] italic font-serif text-xs block mt-2 -mb-4 ">
                This field is required & maximum 300 characters
              </span>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3 ">
            <button
              className="shadow bg-blue-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded"
              type="submit"
            >
              Send
            </button>
          </div>
          <div className="md:w-2/3" />
        </div>
      </form>
    </Fragment>
  );
};
