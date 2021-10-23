export const addNewHobby = (hobby: any) => {
  return { type: "ADD_HOBBY", payload: hobby };
};

export const setActiveHobby = (hobby: any) => {
  return { type: "SET_ACTIVE_HOBBY", payload: hobby };
};
