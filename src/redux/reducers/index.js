import { combineReducers } from "redux";
import currencies from "./currencies";
import defaultCurrency from "./defaultCurrency";
import currenciesList from "./currenciesList";
import currencyConverter from "./currencyConverter";

export default combineReducers({
  currencies,
  defaultCurrency,
  currenciesList,
  currencyConverter
});
