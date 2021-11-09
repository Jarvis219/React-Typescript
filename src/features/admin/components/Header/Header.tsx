import { Fragment } from "react";
import { Link } from "react-router-dom";
const backgroundNav = {
  backgroundColor: "#3F495E",
};

const handelSideBar = () => {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none";
  }
};

export const Header = () => {
  return (
    <Fragment>
      <header className="bg-nav" style={backgroundNav}>
        <div className="flex justify-between">
          <div className="p-1 mx-3 inline-flex items-center">
            <span onClick={handelSideBar} className="text-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            </span>
            <Link to="/" className="pb-2 ml-3">
              <img
                style={{ width: "25px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1724px-Apple_logo_grey.svg.png"
                alt=""
              />
            </Link>
          </div>
          <div className="p-1 flex flex-row items-center"></div>
        </div>
      </header>
    </Fragment>
  );
};
