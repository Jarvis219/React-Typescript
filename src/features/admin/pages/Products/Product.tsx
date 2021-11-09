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
  UpdateProduct,
} from "./ProductSlice";
import { FirebaseUploadPhoto } from "helpers/filebaseUpload";
import { ProductPagination, ProductStatus } from "constants/product";
import { notifyError, notifySuccess, Pagination } from "utils/utils";

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

  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormEdit, setShowFormEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [diaLog, setDialog] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<any>(null);
  const [dataDetele, setDataDelete] = useState<ProductModel>();
  const [pagination, setPagination] = useState<Pagination>({
    limit: 0,
    skip: 3,
  });
  const [productState, setProductState] = useState<ProductModel>();
  const [disablePagination, setDisablePagination] =
    useState<DisabledProductPaginationType>({
      action: ProductPagination.minus,
      status: true,
    });
  const [countPage, setCountPage] = useState<number>(products.length);

  useEffect(() => {
    const arr: any = [];
    products.forEach((item: any) => {
      if (item.status !== ProductStatus.delete) {
        arr.push(item);
      }
    });
    setProductState(arr.slice(pagination.limit, pagination.skip));
  }, [pagination, countPage, products]);

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
      if (data.status === ProductStatus.delete) {
        setCountPage((pre) => (pre -= 1));
      }
      setShowFormEdit(false);
      notifySuccess(currentProduct.message + " 👌");
    } catch (error) {
      notifyError("Update product failure !!!");
    }
  };

  const handleCreateSubmit = async (
    data: ProductModel,
    name: string
  ): Promise<void> => {
    console.log(products);
    const nameProduct: number = isCheckNameProduct(name).length;
    if (nameProduct !== 0) {
      notifyError("Product already exists!!");
      return;
    }
    let { photo }: any = data;
    if (photo.length === 0) {
      try {
        setLoading(true);
        const actionResult: any = await dispatch(
          createProductSlice(Object.assign(data, { photo: null }))
        );
        const currentProduct = unwrapResult(actionResult);
        setLoading(false);
        setShowFormCreate(false);
        setCountPage((pre) => (pre += 1));
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
      if (currentProduct.data.status === ProductStatus.delete) {
        setCountPage((pre) => (pre -= 1));
      }
      notifySuccess(currentProduct.message + " 👌");
    } catch (error) {
      notifyError("Update status product failure !!!");
    }
  };

  const handlePagination = (action: ProductPaginationType): void => {
    if (action.type === ProductPagination.plus) {
      setPagination((pre): any => {
        setDisablePagination({
          action: ProductPagination.minus,
          status: false,
        });

        if (pre.skip >= countPage - 1) {
          setDisablePagination({
            action: ProductPagination.plus,
            status: true,
          });
        }
        return Object.assign({}, pre, {
          skip: pre.skip + 3,
          limit: pre.limit + 3,
        });
      });
    } else {
      setPagination((pre): any => {
        if (pre.limit <= 2) {
          setDisablePagination({
            action: ProductPagination.minus,
            status: true,
          });
          pre.limit = 0;
          pre.skip = 3;
          return pre;
        }
        return Object.assign({}, pre, {
          skip: pre.skip - 3,
          limit: pre.limit - 3,
        });
      });
    }
  };

  const isCheckNameProduct = (name: string): Array<string> => {
    return products.filter(
      (item: any) =>
        item.name.toLocaleLowerCase() === name.toLocaleLowerCase().trim()
    );
  };

  return (
    <div>
      <ProductList
        products={productState}
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
