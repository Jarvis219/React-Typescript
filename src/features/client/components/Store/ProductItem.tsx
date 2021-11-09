/* eslint-disable array-callback-return */
import { ProductStatus } from "constants/product";
import { Fragment, memo } from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ products }: any) => {
  return (
    <Fragment>
      {products ? (
        products.map((item: any, index: number) => {
          if (item.status === ProductStatus.public) {
            return (
              <div
                key={index}
                className='w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col '>
                <Link
                  to={`/product/${item._id}`}
                  className='border w-[291px] h-[400px] shadow-lg'>
                  <div className='p-4'>
                    <img
                      className='hover:grow hover:shadow-lg object-cover w-[259px] h-[259px]'
                      src={item.photo}
                      alt=''
                    />
                    <div className='pt-3 flex items-center justify-between '>
                      <span>{item.name}</span>
                      <svg
                        className='h-6 w-6 fill-current text-gray-500 hover:text-black'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'>
                        <path d='M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z' />
                      </svg>
                    </div>
                    <div>
                      <span className='pt-1  text-red-500'>${item.price}</span>
                      {item.sale ? (
                        <span className='pt-1 px-4 text-xs lg:text-sm xl:text-md line-through text-gray-500'>
                          ${item.price + item.sale}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        })
      ) : (
        <div className=' mx-auto text-red-400'>
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
      )}
    </Fragment>
  );
};

export default memo(ProductItem);
