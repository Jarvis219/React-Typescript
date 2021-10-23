import React from "react";
import { useDispatch } from "react-redux";
// import { Hobby } from "../components/hobby/Hobby";
import { addHobbies } from "./hobbySlice";

export const Home = () => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const rand = Math.floor(Math.random() * 10);
    dispatch(addHobbies(rand));
  };

  return (
    <div>
      <button onClick={handleSubmit}>dis</button>
      {/* <Hobby onClick={handleSubmit} /> */}
    </div>
  );
};
