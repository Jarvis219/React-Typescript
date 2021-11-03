// import { useState } from "react";

import { logout } from "utils/utils";
import { useHistory } from "react-router";

const HomeTest = () => {
  const history = useHistory();

  const handerLogout = () => {
    logout();
    history.push("/login");
  };
  return (
    <div>
      <button
        onClick={handerLogout}
        className="px-2 py-2 mr-md-1 rounded cursor-pointer"
      >
        <span className="ion-logo-facebook mr-2" /> Out
      </button>
    </div>
  );
};

export default HomeTest;
