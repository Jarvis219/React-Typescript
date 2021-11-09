import { Fragment, memo } from "react";
import { useAppSelector } from "app/hook";
import { NavLink } from "react-router-dom";
const Menu = () => {
  const categories = useAppSelector((state: any) => {
    return state.category.current;
  });
  return (
    <Fragment>
      <nav className=''>
        <ul
          className='
          md:flex
          items-center
          justify-between
          text-base text-gray-700
          pt-4
          md:pt-0
        '>
          {categories && Array.isArray(categories)
            ? categories.map((item: any, index: number) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={`/category/${item._id}`}
                      className='
                  inline-block
                  no-underline
                  hover:text-black hover:underline
                  py-2
                  px-4
                '>
                      {item.name}
                    </NavLink>
                  </li>
                );
              })
            : ""}
        </ul>
      </nav>
    </Fragment>
  );
};

export default memo(Menu);
