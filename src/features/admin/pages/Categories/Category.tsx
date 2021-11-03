import { lazy, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  CreateCategory as CreateCategorySlice,
  listCategory,
  removeCategory,
  updateCategory,
} from "./CategorySlice";
import { useAppDispatch, useAppSelector } from "app/hook";
import { unwrapResult } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { editCategory } from "models/category";

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
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state: any) => {
    return state.category.current;
  });

  const notifyError = (error: string) => toast.error(error);
  const notifySuccess = (success: string) =>
    toast.success(success, { icon: "🚀" });

  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormEdit, setShowFormEdit] = useState<boolean>(false);
  const [diaLog, setDialog] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<editCategory | null>(null);
  const [dataDelete, setDataDelete] = useState<string | null>(null);

  const handleShowFromCreate = (data: boolean): void => {
    setShowFormCreate(data);
  };

  const handleShowFromEdit = (data: editCategory): void => {
    if (data.status === false) {
      setShowFormEdit(data.status);
      return;
    }
    setDataEdit(categories.filter((item: any) => item._id === data.id)[0]);

    setShowFormEdit(data.status);
  };

  const handleShowDialogDelete = (data: editCategory) => {
    setDialog(data.status);
    setDataDelete(data.id);
  };

  const handleConFirm = async (data: any) => {
    setDialog(false);
    if (!data || typeof dataDelete !== "string") return;
    try {
      const actionResult: any = await dispatch(removeCategory(dataDelete));
      const currentCategory = unwrapResult(actionResult);
      getCategories();
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      notifyError("Delete category failure !!!");
    }
  };

  const handleEditCategory = async (data: any) => {
    const category = {
      id: data._id,
      name: data.name,
    };
    if (data.name.trim() === "") {
      notifyError("Please check your name category again");
    } else {
      try {
        const actionResult: any = await dispatch(updateCategory(category));
        const currentCategory = unwrapResult(actionResult);
        getCategories();
        notifySuccess(currentCategory.message + " 👌");
      } catch (error) {
        console.log(error);
        notifyError("Please check your name category again");
      }
    }
  };

  const getCategories = async () => {
    try {
      await dispatch(listCategory());
      setShowFormEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCreate = async (data: any) => {
    if (data.name.trim() === "") {
      notifyError("Please check your name category again");
    } else {
      try {
        const actionResult: any = await dispatch(CreateCategorySlice(data));
        const currentCategory = unwrapResult(actionResult);
        setShowFormCreate(false);
        notifySuccess(currentCategory.message + " 👌");
      } catch (error) {
        notifyError("Please check your name category again");
      }
    }
  };

  return (
    <div>
      <CategoryList
        categories={categories}
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
        <CreateCategory
          handleSubmitCreate={handleSubmitCreate}
          handleShowFromCreate={handleShowFromCreate}
        />
      ) : (
        ""
      )}
      {showFormEdit ? (
        <EditCategory
          dataEdit={dataEdit}
          handleEditCategory={handleEditCategory}
          handleShowFromEdit={handleShowFromEdit}
        />
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default Category;
