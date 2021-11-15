import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/hook";
import Radio from "components/Radio/Radio";
import { UpdateUser } from "features/admin/pages/User/UserSlice";
import { useCallback } from "react";
import { notifyError, notifySuccess } from "utils/utils";
// UpdateUser;

const Premission = ({ permission, name, _id }: any) => {
  const dispatch = useAppDispatch();
  const handlePermission = useCallback(
    async (permission: number): Promise<void> => {
      try {
        const actionResult: any = await dispatch(
          UpdateUser({ _id, permission })
        );
        const currentCategory = unwrapResult(actionResult);
        notifySuccess(currentCategory.message + " 👌");
      } catch (error) {
        notifyError("Update user failure !!!");
      }
    },
    [dispatch, _id]
  );
  return (
    <div>
      <Radio
        name={name}
        handlePermission={handlePermission}
        permission={permission}
      />
    </div>
  );
};

export default Premission;
