import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hook";
import { ProductModel } from "models/product";
import { ProductStatus } from "constants/product";
import ProductItem from "features/client/components/Store/ProductItem";
import { ListProduct } from "features/admin/pages/Products/ProductSlice";

const ProductCategories = () => {
  const { id }: any = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: any) => {
    return state.product.current;
  });

  const [productState, setProductState] = useState<ProductModel[]>([]);
  const [nameCategory, setNameCategory] = useState<string>();

  useEffect(() => {
    products.forEach((item: any) => {
      if (item.category._id === id && item.status === ProductStatus.public) {
        setNameCategory(item.category.name);
        setProductState((state: any) => [...state, item]);
      }
    });
    return () => setProductState([]);
  }, [products, id]);

  useEffect(() => {
    if (!localStorage.getItem("search")) return;
    localStorage.removeItem("search");
    dispatch(ListProduct());
  }, [dispatch]);
  return (
    <Fragment>
      <h2 className='text-center uppercase font-bold'>{nameCategory}</h2>
      <div className='container mx-auto flex items-center flex-wrap mt-8'>
        <ProductItem products={productState} />
      </div>
    </Fragment>
  );
};

export default ProductCategories;
