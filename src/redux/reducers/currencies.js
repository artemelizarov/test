const currencies = (state = [], action) => {
  switch (action.type) {
    case "SET_CURRENCIES":
      return action.currencies;
    default:
      return state;
  }
};

export default currencies;
