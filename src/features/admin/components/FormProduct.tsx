import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  price: string;
  photo: File;
};
export const FormProduct = ({ handleSubmitForm }: any) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    const product = {
      name: data.name,
      price: data.price,
      photo: data.photo[0],
    };
    handleSubmitForm(product);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name'>
            name <br />
            <input type='text' {...register("name")} />
          </label>
        </div>
        <div>
          <label htmlFor='price'>
            price <br />
            <input type='number' {...register("price")} />
          </label>
        </div>
        <div>
          <label htmlFor='photo'>
            photo <br />
            <input type='file' {...register("photo")} />
          </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};
