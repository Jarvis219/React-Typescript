import { lazy, useState } from "react";
import {
  CreateCategory as CreateCategorySlice,
  removeCategory,
  updateCategory,
} from "./CategorySlice";
import { useAppDispatch, useAppSelector } from "app/hook";
import { unwrapResult } from "@reduxjs/toolkit";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { editCategory } from "models/category";
import { notifyError, notifySuccess } from "utils/utils";
import { FilterCategory } from "../Products/ProductSlice";
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
    if (!data) {
      setDialog(false);
      return;
    }
    if (!dataDelete) return;
    try {
      const actionResult: any = await dispatch(FilterCategory(dataDelete));
      const currentCategory = unwrapResult(actionResult);
      if (currentCategory === null) {
        if (!data || typeof dataDelete !== "string") return;
        try {
          const actionResult: any = await dispatch(removeCategory(dataDelete));
          const currentCategory = unwrapResult(actionResult);
          notifySuccess(currentCategory.message + " 👌");
        } catch (error) {
          notifyError("Delete category failure !!!");
        }
      } else {
        notifyError("Please delete all products related to the category");
      }
    } catch (error) {
      notifyError("Delete category failure !!!");
    }
    setDialog(false);
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
        setShowFormEdit(false);
        notifySuccess(currentCategory.message + " 👌");
      } catch (error) {
        notifyError("Please check your name category again");
      }
    }
  };

  const handleSubmitCreate = async (data: any, isCheckName: string) => {
    const nameCategory: number = isCheckNameCategory(isCheckName).length;
    if (data.name.trim() === "") {
      notifyError("Please check your name category again");
    } else if (nameCategory !== 0) {
      notifyError("Category already exists!!");
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

  const isCheckNameCategory = (name: string): Array<string> => {
    return categories.filter(
      (item: any) =>
        item.name.toLocaleLowerCase() === name.toLocaleLowerCase().trim()
    );
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
    </div>
  );
};

export default Category;
