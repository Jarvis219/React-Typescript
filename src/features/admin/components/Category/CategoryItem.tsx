/* eslint-disable array-callback-return */
import { useAppSelector } from "app/hook";
import { Fragment, memo, useEffect, useState } from "react";
import { arrayMove } from "utils/utils";

const CategoryItem = (props?: any) => {
  const [index, setIndex] = useState<number | null>(null);
  const [sortCategory, setSortCategory] = useState<Array<string>>();
  let categories = useAppSelector((state: any) => {
    return state.category.current;
  });

  useEffect(() => {
    if (!props.itemCategory) return;
    categories.forEach((item: any, index: number) => {
      if (item._id === props.itemCategory._id) {
        setIndex(index);
        return;
      }
    });
    if (index === null) return;

    setSortCategory(arrayMove(categories, index));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  if (sortCategory) {
    categories = sortCategory;
  }

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
