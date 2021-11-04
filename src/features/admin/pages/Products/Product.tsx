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
import { ProductStatus } from "constants/product";

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

  const [dataDetele, setDataDelete] = useState<ProductModel>();

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
  const handleShowDialogDelete = (status: boolean, data: ProductModel) => {
    setDialog(status);

    setDataDelete(data);
  };

  const handleConFirm = async (data: boolean): Promise<void> => {
    if (data) {
      if (dataDetele?.status === ProductStatus.public) {
        updateStatusFromTrash(
          Object.assign({}, dataDetele, { status: ProductStatus.private })
        );
      } else {
        updateStatusFromTrash(
          Object.assign({}, dataDetele, { status: ProductStatus.delete })
        );
      }
      // deleteProduct();
    }
    setDialog(false);
  };

  const updateStatusFromTrash = async (data: ProductModel): Promise<void> => {
    try {
      setLoading(true);
      const actionResult: any = await dispatch(UpdateProduct(data));
      const currentProduct = unwrapResult(actionResult);
      getProducts();
      setShowFormEdit(false);
      notifySuccess(currentProduct.message + " 👌");
    } catch (error) {
      notifyError("Update product failure !!!");
    }
  };

  const handleCreateSubmit = async (data: ProductModel): Promise<void> => {
    let { photo }: any = data;
    if (photo.length === 0) {
      try {
        setLoading(true);
        const actionResult: any = await dispatch(
          createProductSlice(Object.assign(data, { photo: null }))
        );
        const currentProduct = unwrapResult(actionResult);
        getProducts();
        setLoading(false);
        setShowFormCreate(false);
        notifySuccess(currentProduct.message + " 👌");
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
      const currentProduct = unwrapResult(actionResult);
      getProducts();
      setLoading(false);
      setShowFormCreate(false);
      notifySuccess(currentProduct.message + " 👌");
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
        const currentProduct = unwrapResult(actionResult);
        getProducts();
        setShowFormEdit(false);
        notifySuccess(currentProduct.message + " 👌");
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
      const currentProduct = unwrapResult(actionResult);
      getProducts();
      setShowFormEdit(false);
      notifySuccess(currentProduct.message + " 👌");
    } catch (error) {
      setShowFormEdit(false);
      notifyError("Create product failure !!!");
    }
  };

  const handleUpdateStatusProduct = async (
    data: ProductModel
  ): Promise<void> => {
    try {
      const actionResult: any = await dispatch(UpdateProduct(data));
      const currentProduct = unwrapResult(actionResult);
      getProducts();
      notifySuccess(currentProduct.message + " 👌");
    } catch (error) {
      notifyError("Update product failure !!!");
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
        handleUpdateStatusProduct={handleUpdateStatusProduct}
        handleShowFromEdit={handleShowFromEdit}
        handleShowFromCreate={handleShowFromCreate}
        handleShowDialogDelete={handleShowDialogDelete}
      />
      {diaLog ? (
        <ConfirmButton
          loading={loading}
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
