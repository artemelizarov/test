import { connect } from "react-redux";
import { fetchCurrencies, fetchDefaultCurrency } from "../redux/actions";
import App from "../components/App";

const mapStateToProps = state => ({
  currencies: state.currencies,
  defaultCurrency: state.defaultCurrency
});

const mapDispatchToProps = dispatch => ({
  fetchCurrencies: () => dispatch(fetchCurrencies()),
  fetchDefaultCurrency: () => dispatch(fetchDefaultCurrency())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
