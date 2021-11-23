import { useAppDispatch } from "app/hook";
import { CreateContact } from "features/admin/pages/Contact/ContactSlice";
import { FormContact } from "features/client/components/Contact/FormContact";
import { ContactModel } from "models/Contact";
import { notifyError, notifySuccess } from "utils/utils";
import { Map } from "../../components/Map/Map";
const Contact = () => {
  const dispatch = useAppDispatch();
  const handleSen = async (data: ContactModel): Promise<void> => {
    try {
      await dispatch(CreateContact(data));

      notifySuccess("Send contact successfully 👌");
    } catch (error) {
      console.log(error);
      notifyError("Send contact failure !!!");
    }
  };
  return (
    <div className="container mx-auto flex justify-center  gap-10 mt-40">
      <FormContact handleSen={handleSen} />
      <Map />
    </div>
  );
};

export default Contact;
