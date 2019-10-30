const currenciesList = (
  state = {
    baseCurrency: "",
    currenciesRates: [],
    errorRates: null,
    favorites: []
  },
  action
) => {
  switch (action.type) {
    case "SET_RATES":
      return {
        ...state,
        currenciesRates: action.rates,
        errorRates: action.error
      };
    case "SET_BASE_CURRENCY":
      return {
        ...state,
        baseCurrency: action.baseCurrency
      };
    case "CHANGE_FAVORITE":
      const { currency } = action;
      let favorites = [...state.favorites];
      if (favorites.includes(currency)) {
        favorites = favorites.filter(value => value !== currency);
      } else {
        favorites.push(currency);
      }
      return {
        ...state,
        favorites: favorites
      };
    default:
      return state;
  }
};

export default currenciesList;
