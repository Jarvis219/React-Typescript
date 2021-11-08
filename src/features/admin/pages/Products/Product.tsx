import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hook";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import {
  ProductModel,
  ProductPaginationType,
  DisabledProductPaginationType,
} from "models/product";
import { lazy, useEffect, useState } from "react";
import {
  CreateProduct as createProductSlice,
  ListProduct,
  UpdateProduct,
} from "./ProductSlice";
import { FirebaseUploadPhoto } from "helpers/filebaseUpload";
import { ProductPagination, ProductStatus } from "constants/product";
import {
  getCountProduct,
  notifyError,
  notifySuccess,
  Pagination,
} from "utils/utils";

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
  const countProduct = getCountProduct();

  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormEdit, setShowFormEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [diaLog, setDialog] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<any>(null);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 3,
    skip: 0,
  });
  const [disablePagination, setDisablePagination] =
    useState<DisabledProductPaginationType>({
      action: ProductPagination.minus,
      status: true,
    });

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
    }
    setLoading(false);
    setDialog(false);
  };

  const updateStatusFromTrash = async (data: ProductModel): Promise<void> => {
    try {
      setLoading(true);
      const actionResult: any = await dispatch(UpdateProduct(data));
      const currentProduct = unwrapResult(actionResult);
      await getProducts();
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
        await getProducts();
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
      await getProducts();
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
    if (photo === null) {
      try {
        setLoading(true);
        const actionResult: any = await dispatch(UpdateProduct(data));
        const currentProduct = unwrapResult(actionResult);
        setLoading(false);
        await getProducts();
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
      let currentProduct;
      if (typeof photo === "string") {
        const actionResult: any = await dispatch(UpdateProduct(data));
        currentProduct = unwrapResult(actionResult);
      } else {
        photo = await FirebaseUploadPhoto(photo[0]);
        const actionResult: any = await dispatch(
          UpdateProduct(Object.assign(data, { photo }))
        );
        currentProduct = unwrapResult(actionResult);
      }
      setLoading(false);
      await getProducts();
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
      await getProducts();
      notifySuccess(currentProduct.message + " 👌");
    } catch (error) {
      notifyError("Update product failure !!!");
    }
  };

  const getProducts = async (): Promise<void> => {
    try {
      await dispatch(ListProduct(pagination));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const handlePagination = (action: ProductPaginationType): void => {
    if (action.type === ProductPagination.plus) {
      setPagination((pre): any => {
        setDisablePagination({
          action: ProductPagination.minus,
          status: false,
        });

        if (pre.skip >= countProduct! - 6) {
          setDisablePagination({
            action: ProductPagination.plus,
            status: true,
          });
        }
        return Object.assign({}, pre, { skip: pre.skip + 3 });
      });
    } else {
      setPagination((pre): any => {
        if (pre.skip <= 0) {
          setDisablePagination({
            action: ProductPagination.minus,
            status: true,
          });
          pre.skip = 0;
          return pre;
        }
        return Object.assign({}, pre, { skip: pre.skip - 3 });
      });
    }
  };

  return (
    <div>
      <ProductList
        products={products}
        handlePagination={handlePagination}
        handleUpdateStatusProduct={handleUpdateStatusProduct}
        handleShowFromEdit={handleShowFromEdit}
        handleShowFromCreate={handleShowFromCreate}
        handleShowDialogDelete={handleShowDialogDelete}
        disablePagination={disablePagination}
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
    </div>
  );
};

export default Product;
