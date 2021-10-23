import React from "react";

export const Hobby = (props: any) => {
  const { hobbyList, activeId, onHobbyClick } = props;

  const handleClick = (hobby: any) => {
    console.log(activeId, hobby);
    if (onHobbyClick) {
      onHobbyClick(hobby);
    }
  };

  return (
    <div>
      <ul>
        {hobbyList.map((item: any, index: number) => (
          <li
            key={index}
            className={item.id === activeId ? "active" : ""}
            onClick={() => handleClick(item.id)}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
