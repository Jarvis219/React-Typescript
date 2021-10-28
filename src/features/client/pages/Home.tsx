// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddHobby } from "../components/hobby/addHobby";
import { Hobby } from "../components/hobby/Hobby";
import { addHobbies } from "./hobbySlice";
import { auth } from "../../../firebase";
import { logout } from "utils/utils";
import { useHistory } from "react-router";

const Home = () => {
  const hobbies = useSelector((state: any) => state.hobbies);
  const history = useHistory();
  // const [hobby, setHobby] = useState(hobbies);
  const dispatch = useDispatch();

  const handleSubmit = (data: any) => {
    dispatch(addHobbies(data));
  };

  const handerLogout = () => {
    logout();
    auth.signOut();
    history.push("/login");
  };
  return (
    <div>
      <AddHobby handler={handleSubmit} />
      <Hobby hobbies={hobbies} />
      <button
        onClick={handerLogout}
        className="px-2 py-2 mr-md-1 rounded cursor-pointer"
      >
        <span className="ion-logo-facebook mr-2" /> Out
      </button>
    </div>
  );
};

export default Home;
