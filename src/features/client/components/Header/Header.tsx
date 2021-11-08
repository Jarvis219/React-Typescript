import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import User from "./User";

export const Header = () => {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const handleShowMenu = () => {
    setDisplayMenu(!displayMenu);
    let menu = displayMenu ? "block" : "hidden";
    document.querySelector("#menu")?.classList.toggle(menu);
  };
  return (
    <Fragment>
      <nav id='header' className='fixed bg-white w-full z-50 top-0 py-1'>
        <div
          className='
    w-full
    container
    mx-auto
    flex 
    items-center
    justify-between
    mt-0
    px-6
    py-3
  '>
          <button
            className='cursor-pointer md:hidden block'
            onClick={handleShowMenu}>
            <svg
              className='fill-current text-gray-900'
              xmlns='http://www.w3.org/2000/svg'
              width={20}
              height={20}
              viewBox='0 0 20 20'>
              <title>menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
          <div>
            <Link
              to='/'
              className='
        flex
        items-center gap-2
        tracking-wide
        no-underline
        hover:no-underline
        font-bold
        text-gray-800 text-xl uppercase
      '>
              <img
                className='mb-2'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1724px-Apple_logo_grey.svg.png'
                height={24}
                width={30}
                alt=''
              />
              applpe
            </Link>
          </div>
          <div
            className='
            hidden
            md:flex md:items-center md:w-auto
            w-full
          '
            id='menu'>
            <Menu />
          </div>
          <div
            className=' flex items-center relative z-20 flex-col pb-4 md:pb-0 md:flex md:justify-end md:flex-row'
            id='nav-content'>
            <Search />
            <User />
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
