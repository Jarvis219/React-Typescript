import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hook";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductModel } from "models/product";
import { lazy, useState } from "react";
import {
  CreateProduct as createProductSlice,
  ListProduct,
  UpdateProduct,
} from "./ProductSlice";
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
  const products = useAppSelector((state: any) => {
    return state.product.current;
  });

  const notifyError = (error: string) => toast.error(error);
  const notifySuccess = (success: string) =>
    toast.success(success, { icon: "🚀" });

  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormEdit, setShowFormEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [diaLog, setDialog] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<any>(null);

  const handleShowFromCreate = (data: boolean): void => {
    setShowFormCreate(data);
  };
  const handleShowFromEdit = (data: {
    status: boolean;
    data?: ProductModel;
  }): void => {
    setShowFormEdit(data.status);
    setDataEdit(data);
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
        getProducts();
        setLoading(false);
        setShowFormCreate(false);
        notifySuccess(currentCategory.message + " 👌");
      } catch (error) {
        setLoading(false);
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
      getProducts();
      setLoading(false);
      setShowFormCreate(false);
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      setLoading(false);
      notifyError("Create product failure !!!");
    }
  };

  const handleEditSubmit = async (data: ProductModel): Promise<void> => {
    let { photo }: any = data;
    if (photo.length === null) {
      try {
        setLoading(true);
        const actionResult: any = await dispatch(UpdateProduct(data));
        const currentCategory = unwrapResult(actionResult);
        getProducts();
        setShowFormEdit(false);
        notifySuccess(currentCategory.message + " 👌");
      } catch (error) {
        setShowFormEdit(false);
        notifyError("Create product failure !!!");
      }
      return;
    }

    try {
      setLoading(true);
      photo = await FirebaseUploadPhoto(photo[0]);
      const actionResult: any = await dispatch(
        UpdateProduct(Object.assign(data, { photo }))
      );
      setLoading(false);
      const currentCategory = unwrapResult(actionResult);
      getProducts();
      setShowFormEdit(false);
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      setShowFormEdit(false);
      notifyError("Create product failure !!!");
    }
  };

  const getProducts = async () => {
    try {
      await dispatch(ListProduct());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProductList
        products={products}
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
        <EditProduct
          loading={loading}
          dataEdit={dataEdit}
          handleEditSubmit={handleEditSubmit}
          handleShowFromEdit={handleShowFromEdit}
        />
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default Product;
