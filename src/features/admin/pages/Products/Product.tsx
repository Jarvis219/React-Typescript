import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { lazy, useState } from "react";
const ProductList = lazy(
  () => import("features/admin/components/Product/Product")
);
const CreateProduct = lazy(
  () => import("features/admin/components/Product/CreateProduct")
);
const EditProduct = lazy(
  () => import("features/admin/components/Product/EditProduct")
);

const Product = () => {
  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [diaLog, setDialog] = useState(false);

  const handleShowFromCreate = (data: boolean): void => {
    setShowFormCreate(data);
  };
  const handleShowFromEdit = (data: boolean): void => {
    setShowFormEdit(data);
  };
  const handleShowDialogDelete = (data: boolean) => {
    setDialog(data);
  };
  const handleConFirm = (data: boolean) => {
    console.log(data);
    setDialog(false);
  };

  return (
    <div>
      <ProductList
        handleShowFromEdit={handleShowFromEdit}
        handleShowFromCreate={handleShowFromCreate}
        handleShowDialogDelete={handleShowDialogDelete}
      />
      {diaLog ? (
        <ConfirmButton
          handleConFirm={handleConFirm}
          handleShowDialogDelete={handleShowDialogDelete}
        />
      ) : (
        ""
      )}
      {showFormCreate ? (
        <CreateProduct handleShowFromCreate={handleShowFromCreate} />
      ) : (
        ""
      )}
      {showFormEdit ? (
        <EditProduct handleShowFromEdit={handleShowFromEdit} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Product;
