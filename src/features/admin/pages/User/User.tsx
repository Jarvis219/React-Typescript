import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hook";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { useState } from "react";
import { notifyError, notifySuccess } from "utils/utils";
import ListUser from "../../components/User/User";
import { RemoveUser } from "./UserSlice";

const User = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: any) => {
    return state.user.current;
  });
  const [diaLog, setDialog] = useState<boolean>(false);
  const [dataDelete, setDataDelete] = useState<string | null>(null);

  const handleConFirm = async (data: boolean): Promise<void> => {
    if (data && dataDelete !== null) {
      try {
        const actionResult: any = await dispatch(RemoveUser(dataDelete));
        const currentCategory = unwrapResult(actionResult);
        notifySuccess(currentCategory.message + " 👌");
      } catch (error) {
        notifyError("Update user failure !!!");
      }
    }
    setDialog(false);
  };
  const handleShowDialogDelete = (data: any) => {
    setDialog(data.status);
    setDataDelete(data.id);
  };
  return (
    <div>
      <ListUser handleShowDialogDelete={handleShowDialogDelete} users={users} />
      {diaLog ? (
        <ConfirmButton
          handleConFirm={handleConFirm}
          handleShowDialogDelete={handleShowDialogDelete}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
