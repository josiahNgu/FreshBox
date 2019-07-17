export const updateObject = (state, updatedProps) => {
  console.log(updatedProps);
  return {
    ...state,
    ...updatedProps
  };
};
