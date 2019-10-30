import { connect } from "react-redux";
import { changeBaseCurrency, changeFavorite } from "../redux/actions";
import CurrenciesList from "../components/CurrenciesList";

const mapStateToProps = state => {
  let currenciesWithRates = [...state.currencies];
  const { currenciesRates, baseCurrency, favorites } = state.currenciesList;
  currenciesWithRates = currenciesWithRates.filter(
    currency => currency.code !== baseCurrency
  );
  if (currenciesRates) {
    currenciesWithRates.forEach(currency => {
      currency.rate = currenciesRates[currency.code];
      currency.favorite = favorites.includes(currency.code);
    });
  }
  currenciesWithRates.sort(a => (a.favorite ? -1 : 1));

  return {
    baseCurrency: state.currenciesList.baseCurrency,
    currenciesRates: currenciesWithRates,
    errorRates: state.currenciesList.errorRates,
    currencies: state.currencies,
    defaultBaseCurrency: state.defaultCurrency,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  changeBaseCurrency: baseCurrency =>
    dispatch(changeBaseCurrency(baseCurrency)),
  changeFavorite: currency => dispatch(changeFavorite(currency))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesList);
