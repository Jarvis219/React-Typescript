import { lazy, useState } from "react";

const CategoryList = lazy(
  () => import("features/admin/components/Category/Category")
);
const CreateCategory = lazy(
  () => import("features/admin/components/Category/CreateCategory")
);
const Category = () => {
  const [showForm, setShowForm] = useState(false);
  const handleShowFrom = (data: boolean): void => {
    setShowForm(data);
  };
  return (
    <div>
      <CategoryList handleShowFrom={handleShowFrom} />
      {showForm ? <CreateCategory handleShowFrom={handleShowFrom} /> : ""}
    </div>
  );
};

export default Category;
