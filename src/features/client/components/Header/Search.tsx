import { useAppDispatch } from "app/hook";
import { ListSearch } from "features/admin/pages/Products/ProductSlice";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
type Inputs = {
  name: string;
};
const Search = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSearch: SubmitHandler<Inputs> = async (data) => {
    try {
      localStorage.setItem("search", "true");
      history.push("/");
      setTimeout(() => {
        dispatch(ListSearch(data.name));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className=' flex items-center justify-center'>
        <form onSubmit={handleSubmit(onSearch)}>
          <div className='flex border-2 rounded'>
            <input
              type='text'
              {...register("name")}
              className='px-2 py-1 w-40 text-[15px] focus:outline-none '
              placeholder='Search...'
            />
            <button className='flex items-center focus:outline-none justify-center px-3 border-l'>
              <svg
                className='w-5 h-5 text-gray-600'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'>
                <path d='M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z' />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Search;
