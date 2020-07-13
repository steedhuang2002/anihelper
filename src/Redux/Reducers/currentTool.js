const currentToolReducer = (state = -1, action) => {
  switch (action.type) {
    case "UPDATE":
      return action.payload;
    default:
      return state;
  }
};

export default currentToolReducer;