import { connect } from "react-redux";
import CurrencyConverter from "../components/CurrencyConverter";
import {
  changeCurrencyFrom,
  changeCurrencyTo,
  changeAmountFrom,
  changeAmountTo
} from "../redux/actions";

const mapStateToProps = state => {
  return {
    currencyFrom: state.currencyConverter.currencyFrom,
    currencyTo: state.currencyConverter.currencyTo,
    amountFrom: state.currencyConverter.amountFrom,
    amountTo: state.currencyConverter.amountTo,
    rate: state.currencyConverter.rate,
    currencies: state.currencies,
    defaultCurrency: state.defaultCurrency
  };
};

const mapDispatchToProps = dispatch => ({
  changeCurrencyFrom: currencyFrom =>
    dispatch(changeCurrencyFrom(currencyFrom)),
  changeCurrencyTo: currencyTo => dispatch(changeCurrencyTo(currencyTo)),
  changeAmountTo: amountTo => dispatch(changeAmountTo(amountTo)),
  changeAmountFrom: amountFrom => dispatch(changeAmountFrom(amountFrom))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyConverter);
