import { useForm, SubmitHandler } from "react-hook-form";
export const AddHobby = ({ handler }: any) => {
  type FormValues = {
    name: string;
    email: string;
  };
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handler(data);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor=''>
          Name
          <input type='text' className='border' {...register("name")} />
        </label>
        <br />
        <label htmlFor=''>
          email
          <input type='text' className='border' {...register("email")} />
        </label>
        <br />
        <button className='border px-2 bg-gray-200'>ADD</button>
      </form>
    </div>
  );
};
