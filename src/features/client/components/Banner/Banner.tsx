import { Fragment } from "react";
import "./banner.css";
export const Banner = () => {
  return (
    <Fragment>
      <div
        className='carousel relative container mx-auto'
        style={{ maxWidth: "1600px" }}>
        <div className='carousel-inner relative overflow-hidden w-full'>
          {/*Slide 1*/}
          <input
            className='carousel-open'
            type='radio'
            id='carousel-1'
            name='carousel'
            aria-hidden='true'
            hidden
            defaultChecked={true}
          />
          <div
            className='carousel-item absolute opacity-0'
            style={{ height: "60vh" }}>
            <div
              className='
        h-full
        w-full
        mx-auto
        flex
        pt-6
        md:pt-0 md:items-center
        bg-cover bg-right
      '
              style={{
                backgroundImage:
                  'url("https://firebasestorage.googleapis.com/v0/b/reactjs-5a1bf.appspot.com/o/images%2Fz2909134437245_67e7677b254b48319f0a4228cac9448e.jpg?alt=media&token=74a5f490-91d0-4ec3-94a8-ea69f5e2469d")',
              }}>
              <div className='container mx-auto'>
                <div
                  className='
            flex flex-col
            w-full
            lg:w-1/2
            md:ml-16
            items-center
            md:items-start
            px-6
            tracking-wide
          '>
                  <p className='text-white text-2xl my-4'>
                    Stripy Zig Zag Jigsaw Pillow and Duvet Set
                  </p>
                  <button
                    className='
              text-xl
              inline-block
              no-underline
              border-b border-white
              leading-relaxed
              text-white
              hover:text-green-300 hover:border-green-300
            '>
                    view product
                  </button>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor='carousel-3'
            className='
      prev
      control-1
      w-10
      h-10
      ml-2
      md:ml-10
      absolute
      cursor-pointer
      hidden
      text-3xl
      font-bold
      text-black
      hover:text-white
      rounded-full
      bg-white
      hover:bg-gray-900
      leading-tight
      text-center
      z-10
      inset-y-0
      left-0
      my-auto
    '>
            ‹
          </label>
          <label
            htmlFor='carousel-2'
            className='
      next
      control-1
      w-10
      h-10
      mr-2
      md:mr-10
      absolute
      cursor-pointer
      hidden
      text-3xl
      font-bold
      text-black
      hover:text-white
      rounded-full
      bg-white
      hover:bg-gray-900
      leading-tight
      text-center
      z-10
      inset-y-0
      right-0
      my-auto
    '>
            ›
          </label>
          {/*Slide 2*/}
          <input
            className='carousel-open'
            type='radio'
            id='carousel-2'
            name='carousel'
            aria-hidden='true'
            hidden
          />
          <div
            className='carousel-item absolute opacity-0 bg-cover bg-right'
            style={{ height: "60vh" }}>
            <div
              className='
        h-full
        w-full
        mx-auto
        flex
        pt-6
        md:pt-0 md:items-center
        bg-cover bg-right
      '
              style={{
                backgroundImage:
                  'url("https://firebasestorage.googleapis.com/v0/b/reactjs-5a1bf.appspot.com/o/images%2Fhero_1_static__d195o2nfxt26_large.jpeg?alt=media&token=8e92ea6a-696b-4b87-96ba-a0a6e4aa6add")',
              }}>
              <div className='container mx-auto'>
                <div
                  className='
            flex flex-col
            w-full
            lg:w-1/2
            md:ml-16
            items-center
            md:items-start
            px-6
            tracking-wide
          '>
                  <p className='text-white text-2xl my-4'>
                    Real Bamboo Wall Clock
                  </p>
                  <button
                    className='
              text-xl
              inline-block
              no-underline
              border-b border-white
              leading-relaxed
              text-white
              hover:text-green-300 hover:border-green-300
            '>
                    view product
                  </button>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor='carousel-1'
            className='
      prev
      control-2
      w-10
      h-10
      ml-2
      md:ml-10
      absolute
      cursor-pointer
      hidden
      text-3xl
      font-bold
      text-black
      hover:text-white
      rounded-full
      bg-white
      hover:bg-gray-900
      leading-tight
      text-center
      z-10
      inset-y-0
      left-0
      my-auto
    '>
            ‹
          </label>
          <label
            htmlFor='carousel-3'
            className='
      next
      control-2
      w-10
      h-10
      mr-2
      md:mr-10
      absolute
      cursor-pointer
      hidden
      text-3xl
      font-bold
      text-black
      hover:text-white
      rounded-full
      bg-white
      hover:bg-gray-900
      leading-tight
      text-center
      z-10
      inset-y-0
      right-0
      my-auto
    '>
            ›
          </label>
          {/*Slide 3*/}
          <input
            className='carousel-open'
            type='radio'
            id='carousel-3'
            name='carousel'
            aria-hidden='true'
            hidden
          />
          <div
            className='carousel-item absolute opacity-0'
            style={{ height: "60vh" }}>
            <div
              className='
        h-full
        w-full
        mx-auto
        flex
        pt-6
        md:pt-0 md:items-center
        bg-cover bg-bottom
      '
              style={{
                backgroundImage:
                  'url("https://firebasestorage.googleapis.com/v0/b/reactjs-5a1bf.appspot.com/o/images%2FScreen%20Shot%202021-11-05%20at%2021.55.23.png?alt=media&token=63d22759-5f0f-45cd-9d40-4fecd369ced4")',
              }}>
              <div className='container mx-auto'>
                <div
                  className='
            flex flex-col
            w-full
            lg:w-1/2
            md:ml-16
            items-center
            md:items-start
            px-6
            tracking-wide
          '>
                  <p className='text-black text-2xl my-4'>
                    Brown and blue hardbound book
                  </p>
                  <button
                    className='
              text-xl
              inline-block
              no-underline
              border-b border-gray-600
              leading-relaxed
              hover:text-black hover:border-black
            '>
                    view product
                  </button>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor='carousel-2'
            className='
      prev
      control-3
      w-10
      h-10
      ml-2
      md:ml-10
      absolute
      cursor-pointer
      hidden
      text-3xl
      font-bold
      text-black
      hover:text-white
      rounded-full
      bg-white
      hover:bg-gray-900
      leading-tight
      text-center
      z-10
      inset-y-0
      left-0
      my-auto
    '>
            ‹
          </label>
          <label
            htmlFor='carousel-1'
            className='
      next
      control-3
      w-10
      h-10
      mr-2
      md:mr-10
      absolute
      cursor-pointer
      hidden
      text-3xl
      font-bold
      text-black
      hover:text-white
      rounded-full
      bg-white
      hover:bg-gray-900
      leading-tight
      text-center
      z-10
      inset-y-0
      right-0
      my-auto
    '>
            ›
          </label>
          {/* Add additional indicators for each slide*/}
          <ol className='carousel-indicators'>
            <li className='inline-block mr-3'>
              <label
                htmlFor='carousel-1'
                className='
          carousel-bullet
          cursor-pointer
          block
          text-4xl text-gray-400
          hover:text-gray-900
        '>
                •
              </label>
            </li>
            <li className='inline-block mr-3'>
              <label
                htmlFor='carousel-2'
                className='
          carousel-bullet
          cursor-pointer
          block
          text-4xl text-gray-400
          hover:text-gray-900
        '>
                •
              </label>
            </li>
            <li className='inline-block mr-3'>
              <label
                htmlFor='carousel-3'
                className='
          carousel-bullet
          cursor-pointer
          block
          text-4xl text-gray-400
          hover:text-gray-900
        '>
                •
              </label>
            </li>
          </ol>
        </div>
      </div>
    </Fragment>
  );
};
