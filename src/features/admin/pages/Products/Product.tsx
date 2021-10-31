import { lazy, useState } from "react";
const ProductList = lazy(
  () => import("features/admin/components/Product/Product")
);
const CreateProduct = lazy(
  () => import("features/admin/components/Product/CreateProduct")
);
const Product = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowFrom = (data: boolean): void => {
    setShowForm(data);
  };

  return (
    <div>
      <ProductList handleShowFrom={handleShowFrom} />
      {showForm ? <CreateProduct handleShowFrom={handleShowFrom} /> : ""}
    </div>
  );
};

export default Product;
