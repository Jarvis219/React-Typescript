import { useAppSelector } from "app/hook";
import { ProductStatus } from "constants/product";
import { AddToCart } from "features/client/components/Cart/AddToCart";
import { NavLinkProduct } from "features/client/components/Product/NavLinkProduct";
import { NavLink, ProductModel } from "models/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id }: any = useParams();
  const products = useAppSelector((state: any) => {
    return state.product.current;
  });

  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [navLink, setNavLink] = useState<NavLink>();

  useEffect(() => {
    products.forEach((item: any) => {
      if (item._id === id && item.status === ProductStatus.public) {
        setNavLink({ category: item.category, product: item.name });
        setProductDetail(item);
      }
    });
    return () => setProductDetail(undefined);
  }, [id, products]);

  return (
    <div>
      {navLink ? <NavLinkProduct navLink={navLink} /> : ""}

      {productDetail ? (
        <section className='text-gray-700 body-font overflow-hidden bg-white'>
          <div className='container px-5 py-5 mx-auto'>
            <div className='lg:w-4/5 mx-auto flex flex-wrap'>
              <img
                alt=''
                className='lg:w-1/2 w-full object-cover object-center rounded border border-gray-200'
                src={productDetail.photo}
              />
              <div className='relative lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                  {productDetail.name}
                </h1>
                <div className='flex mb-4'>
                  <span className='flex items-center'>
                    <svg
                      fill='currentColor'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      className='w-4 h-4 text-red-500'
                      viewBox='0 0 24 24'>
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                    <svg
                      fill='currentColor'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      className='w-4 h-4 text-red-500'
                      viewBox='0 0 24 24'>
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                    <svg
                      fill='currentColor'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      className='w-4 h-4 text-red-500'
                      viewBox='0 0 24 24'>
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                    <svg
                      fill='currentColor'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      className='w-4 h-4 text-red-500'
                      viewBox='0 0 24 24'>
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      className='w-4 h-4 text-red-500'
                      viewBox='0 0 24 24'>
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                    <span className='text-gray-600 ml-3'>4 Reviews</span>
                  </span>
                  <span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
                    <button className='text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-5 h-5'
                        viewBox='0 0 24 24'>
                        <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
                      </svg>
                    </button>
                    <button className='ml-2 text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-5 h-5'
                        viewBox='0 0 24 24'>
                        <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
                      </svg>
                    </button>
                    <button className='ml-2 text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-5 h-5'
                        viewBox='0 0 24 24'>
                        <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' />
                      </svg>
                    </button>
                  </span>
                </div>
                <p className='leading-relaxed'>{productDetail.description}</p>
                <div className='xl:absolute bottom-0 right-5 xl:w-full'>
                  <div className='flex items-center justify-start'>
                    <div className='xl:ml-[13%]'>
                      <span className='title-font font-medium text-2xl text-gray-900'>
                        ${productDetail.price}
                      </span>
                      {productDetail.sale ? (
                        <span className='title-font px-3  font-medium text-xs md:text-md lg:text-lg xl:text-xl line-through text-gray-500'>
                          ${productDetail.price + productDetail.sale}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <AddToCart product={productDetail} id={id} />
                    <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-5 h-5'
                        viewBox='0 0 24 24'>
                        <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className='flex justify-center items-end mx-auto text-red-400'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-20 mx-6 w-20'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Product not found</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
