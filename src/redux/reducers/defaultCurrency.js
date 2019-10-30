const defaultCurrency = (state = "", action) => {
  switch (action.type) {
    case "SET_DEFAULT_CURRENCY":
      return action.defaultCurrency;
    default:
      return state;
  }
};

export default defaultCurrency;
