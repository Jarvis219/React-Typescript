import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/hook";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductModel } from "models/product";
import { lazy, useState } from "react";
import { CreateProduct as createProductSlice } from "./ProductSlice";
import { FirebaseUploadPhoto } from "helpers/filebaseUpload";

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
  const dispatch = useAppDispatch();
  const notifyError = (error: string) => toast.error(error);
  const notifySuccess = (success: string) =>
    toast.success(success, { icon: "🚀" });

  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormEdit, setShowFormEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [diaLog, setDialog] = useState<boolean>(false);

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

  const handleCreateSubmit = async (data: ProductModel): Promise<void> => {
    let { photo }: any = data;
    if (photo.length === 0) {
      try {
        setLoading(true);
        const actionResult: any = await dispatch(
          createProductSlice(Object.assign(data, { photo: null }))
        );
        const currentCategory = unwrapResult(actionResult);
        setLoading(false);
        setShowFormCreate(false);
        notifySuccess(currentCategory.message + " 👌");
      } catch (error) {
        notifyError("Create product failure !!!");
      }
      return;
    }

    try {
      setLoading(true);
      photo = await FirebaseUploadPhoto(photo[0]);
      const actionResult: any = await dispatch(
        createProductSlice(Object.assign(data, { photo }))
      );
      setLoading(false);
      const currentCategory = unwrapResult(actionResult);
      setShowFormCreate(false);
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      notifyError("Create product failure !!!");
    }
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
        <CreateProduct
          loading={loading}
          handleCreateSubmit={handleCreateSubmit}
          handleShowFromCreate={handleShowFromCreate}
        />
      ) : (
        ""
      )}
      {showFormEdit ? (
        <EditProduct handleShowFromEdit={handleShowFromEdit} />
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default Product;
