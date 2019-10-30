const currencyConverter = (
  state = {
    currencyFrom: "",
    currencyTo: "",
    amountFrom: 1,
    amountTo: 0,
    rate: 0
  },
  action
) => {
  switch (action.type) {
    case "SET_CURRENCY_FROM":
      return { ...state, currencyFrom: action.currencyFrom };
    case "SET_CURRENCY_TO":
      return { ...state, currencyTo: action.currencyTo };
    case "SET_AMOUNT_FROM":
      return { ...state, amountFrom: action.amountFrom };
    case "SET_AMOUNT_TO":
      return { ...state, amountTo: action.amountTo };
    case "SET_RATE":
      return { ...state, rate: action.rate };
    default:
      return state;
  }
};

export default currencyConverter;
