import { FormProduct } from "features/admin/components/FormProduct";
import { FirebaseUploadPhoto } from "helpers/filebaseUpload";
const CreateProduct = () => {
  const handleSubmitForm = async (data: any) => {
    await FirebaseUploadPhoto(data.photo);
  };

  return (
    <>
      <FormProduct handleSubmitForm={handleSubmitForm} />
    </>
  );
};
export default CreateProduct;
