/* eslint-disable array-callback-return */
import { useAppDispatch, useAppSelector } from "app/hook";
import { ProductStatus } from "constants/product";
import ConfirmButton from "features/admin/components/DiaLog/ConfirmButton";
import { DeletePhotoUpload } from "helpers/filebaseUpload";
import { ProductModel } from "models/product";
import { Fragment, useEffect, useState } from "react";
import { notifyError, notifySuccess, removeEmptyArray } from "utils/utils";
import { RemoveProduct, UpdateProduct } from "./ProductSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ColorBackground } from "constants/color";
import ButtonUI1 from "components/Button/Button";

const TrashProduct = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: any) => {
    return state.product.current;
  });

  const [trashProduct, setTrashProduct] = useState<ProductModel>();
  const [removeEmpty, setRemoveEmpty] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [diaLog, setDialog] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    setTrashProduct(
      products.map((item: ProductModel) => {
        if (item.status === ProductStatus.delete) {
          return item;
        }
      })
    );
  }, [products]);

  useEffect(() => {
    if (trashProduct) {
      setRemoveEmpty(removeEmptyArray(trashProduct));
    }
  }, [trashProduct]);

  const handleShowDialogDelete = (status: boolean, data: ProductModel) => {
    const { _id, photo }: any = data;
    setIdDelete(_id);
    setPhoto(photo);
    setDialog(status);
  };

  const handleConFirm = async (data: boolean): Promise<void> => {
    if (data) {
      deleteProduct();
    }
    setDialog(false);
  };

  const undoTrashProduct = (data: ProductModel) => {
    updateStatusFromTrash(
      Object.assign({}, data, { status: ProductStatus.public })
    );
  };

  const deleteProduct = async (): Promise<void> => {
    try {
      if (!idDelete) return;
      setLoading(true);

      if (photo && photo !== null) {
        try {
          await DeletePhotoUpload(photo);
          notifySuccess("Delete image to firebase succsessfully 👌");
        } catch (error) {
          notifyError("Delete image failure !!!");
        }
      }
      const actionResult: any = await dispatch(RemoveProduct(idDelete));
      const currentCategory = unwrapResult(actionResult);
      setLoading(false);
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      setLoading(false);
      notifyError("Delete product failure !!!");
    }
  };

  const updateStatusFromTrash = async (data: ProductModel): Promise<void> => {
    try {
      setLoading(true);
      const actionResult: any = await dispatch(UpdateProduct(data));
      const currentCategory = unwrapResult(actionResult);
      notifySuccess(currentCategory.message + " 👌");
    } catch (error) {
      notifyError("Update product failure !!!");
    }
  };

  return (
    <Fragment>
      <div className='flex flex-1  flex-col md:flex-row lg:flex-row mx-2 text-center'>
        <div className='mb-2 border-solid border-gray-300 rounded border shadow-sm w-full'>
          <div
            style={{ backgroundColor: ColorBackground.blue }}
            className='font-bold text-white px-2 py-3 border-solid  border-b uppercase text-center'>
            Products trash
          </div>
          <div className='p-3'>
            <table className='table-responsive w-full rounded'>
              <thead>
                <tr>
                  <th className='border w-1/4 px-4 py-2'>Name</th>
                  <th className='border w-1/6 px-4 py-2'>Category</th>
                  <th className='border w-1/6 px-4 py-2'>Photo</th>
                  <th className='border w-1/6 px-4 py-2'>Price</th>
                  <th className='border w-1/6 px-4 py-2'>Sale</th>
                  <th className='border w-1/6 px-4 py-2'>Quantity</th>
                  <th className='border w-1/6 px-4 py-2'>Sold</th>
                  <th className='border w-1/5 px-4 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='text-gray-800'>
                {removeEmpty ? (
                  removeEmpty.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td className='border px-4 py-2'>{item.name}</td>
                        <td className='border px-4 py-2'>
                          {item.category.name}
                        </td>
                        <td className='border px-4 py-2'>
                          <img src={item.photo} width='100' alt='isphoto' />
                        </td>
                        <td className='border px-4 py-2'>{item.price} $</td>
                        <td className='border px-4 py-2'>{item.sale} $</td>
                        <td className='border px-4 py-2'>{item.quantity} $</td>
                        <td className='border px-4 py-2'>{item.sold} $</td>

                        <td className='border px-4 py-2'>
                          <div className='flex justify-center items-center'>
                            <span
                              onClick={() => undoTrashProduct(item)}
                              className='cursor-pointer transform scale-100 hover:scale-125 transition duration-300  mx-1 '>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke={ColorBackground.blue}>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z'
                                />
                              </svg>
                            </span>

                            <span
                              onClick={() => handleShowDialogDelete(true, item)}
                              className='cursor-pointer transform scale-100 hover:scale-125 transition duration-300  mx-1 '>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='red'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                />
                              </svg>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className=' ml-[1%] flex justify-end gap-[60%] lg:gap-[70%] xl:gap-[81%]'>
        <div className='inline-flex '>
          <ButtonUI1
            size={"sm"}
            color={"blue"}
            className={"mx-1 "}
            text={"Prev"}
          />
          <ButtonUI1
            size={"sm"}
            color={"blue"}
            className={"mx-1 "}
            text={"Next"}
          />
        </div>
      </div>
      {diaLog ? (
        <ConfirmButton
          loading={loading}
          handleConFirm={handleConFirm}
          handleShowDialogDelete={handleShowDialogDelete}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default TrashProduct;
