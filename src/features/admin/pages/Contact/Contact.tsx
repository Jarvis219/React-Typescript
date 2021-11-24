import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hook";
import ContactList from "features/admin/components/Contact/Contact";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { ContactModel } from "models/Contact";
import { Fragment, useState } from "react";
import { notifyError, notifySuccess } from "utils/utils";
import { removeContact, updateContact } from "./ContactSlice";

const Contact = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state: any) => {
    return state.contact.current;
  });
  const [diaLog, setDialog] = useState<boolean>(false);
  const [dataDelete, setDataDelete] = useState<string | null>(null);
  const handleUpdateContact = async (data: ContactModel): Promise<void> => {
    if (!data) return;
    try {
      const actionResult: any = await dispatch(updateContact(data));
      const currentCategory = unwrapResult(actionResult);
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      notifyError("Update contact failure !!!");
    }
  };

  const handleConFirm = async (data: any) => {
    if (!data || !dataDelete) {
      setDialog(false);
      return;
    }
    try {
      const actionResult: any = await dispatch(removeContact(dataDelete));
      const currentCategory = unwrapResult(actionResult);
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      notifyError("Delete contact failure !!!");
    }
    setDialog(!diaLog);
  };
  const handleShowDialogDelete = (data: any) => {
    setDialog(data.status);
    setDataDelete(data.id);
  };
  return (
    <Fragment>
      <ContactList
        contacts={contacts}
        handleShowDialogDelete={handleShowDialogDelete}
        handleUpdateContact={handleUpdateContact}
      />
      {diaLog ? (
        <ConfirmButton
          handleConFirm={handleConFirm}
          handleShowDialogDelete={handleShowDialogDelete}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Contact;
