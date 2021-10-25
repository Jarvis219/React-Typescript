// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddHobby } from "../components/hobby/addHobby";
import { Hobby } from "../components/hobby/Hobby";
import { addHobbies } from "./hobbySlice";

export const Home = () => {
  const hobbies = useSelector((state: any) => state.hobbies);
  // const [hobby, setHobby] = useState(hobbies);
  const dispatch = useDispatch();

  const handleSubmit = (data: any) => {
    dispatch(addHobbies(data));
  };
  return (
    <div>
      <AddHobby handler={handleSubmit} />
      <Hobby hobbies={hobbies} />
    </div>
  );
};
