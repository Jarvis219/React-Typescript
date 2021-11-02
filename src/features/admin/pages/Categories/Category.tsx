import { lazy, useState } from "react";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";

const CategoryList = lazy(
  () => import("features/admin/components/Category/Category")
);
const CreateCategory = lazy(
  () => import("features/admin/components/Category/CreateCategory")
);
const EditCategory = lazy(
  () => import("features/admin/components/Category/EditCategory")
);
const Category = () => {
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
    setDialog(false);
    console.log(data);
  };
  return (
    <div>
      <CategoryList
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
        <CreateCategory handleShowFromCreate={handleShowFromCreate} />
      ) : (
        ""
      )}
      {showFormEdit ? (
        <EditCategory handleShowFromEdit={handleShowFromEdit} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Category;
