/* eslint-disable array-callback-return */
import { useAppSelector } from "app/hook";
import { Fragment, memo } from "react";

const CategoryItem = (props: any) => {
  const categories = useAppSelector((state: any) => {
    return state.category.current;
  });

  return (
    <Fragment>
      {categories.map((item: any, index: number) => (
        <option key={index} value={item._id}>
          {item.name}
        </option>
      ))}
    </Fragment>
  );
};

export default memo(CategoryItem);
