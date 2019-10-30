import { getCurrenciesList, getDefaultCurrency } from "../../common/currencies";
import { CURRENCY_RATE_API } from "../../common/constants";

export function fetchCurrencies() {
  return dispatch => {
    dispatch(requestDefaultCurrency());
    getCurrenciesList(currencies => dispatch(setCurrencies(currencies)));
  };
}

export function fetchDefaultCurrency() {
  return dispatch => {
    dispatch(requestCurrencies());
    getDefaultCurrency(currency => dispatch(setDefaultCurrency(currency)));
  };
}

export function changeBaseCurrency(baseCurrency) {
  return dispatch => {
    dispatch(setBaseCurrency(baseCurrency));
    dispatch(fetchRates(baseCurrency));
  };
}

export function changeCurrencyFrom(currencyFrom) {
  return (dispatch, getState) => {
    const { currencyTo, amountFrom } = getState().currencyConverter;
    dispatch(setCurrencyFrom(currencyFrom));
    dispatch(
      fetchRate(currencyFrom, currencyTo, rate =>
        dispatch(setAmountTo(calcAmountTo(amountFrom, rate)))
      )
    );
  };
}

export function changeCurrencyTo(currencyTo) {
  return (dispatch, getState) => {
    const { currencyFrom, amountFrom } = getState().currencyConverter;
    dispatch(setCurrencyTo(currencyTo));
    dispatch(
      fetchRate(currencyFrom, currencyTo, rate => {
        dispatch(setAmountTo(calcAmountTo(amountFrom, rate)));
      })
    );
  };
}

export function changeAmountFrom(amountFrom) {
  return (dispatch, getState) => {
    dispatch(setAmountFrom(amountFrom));

    const { rate } = getState().currencyConverter;
    dispatch(setAmountTo(calcAmountTo(amountFrom, rate)));
  };
}

export function changeAmountTo(amountTo) {
  return (dispatch, getState) => {
    dispatch(setAmountTo(amountTo));

    const { rate } = getState().currencyConverter;
    dispatch(setAmountFrom(calcAmountFrom(amountTo, rate)));
  };
}

export function changeFavorite(currency) {
  return { type: "CHANGE_FAVORITE", currency };
}

function requestDefaultCurrency() {
  return { type: "REQUEST_DEFAULT_CURRENCY" };
}

function requestCurrencies() {
  return { type: "REQUEST_CURRENCIES" };
}

function setDefaultCurrency(defaultCurrency) {
  return { type: "SET_DEFAULT_CURRENCY", defaultCurrency };
}

function setCurrencies(currencies) {
  return { type: "SET_CURRENCIES", currencies };
}

function setRates(rates, error) {
  return { type: "SET_RATES", rates, error };
}

function requestRates(baseCurrency) {
  return { type: "REQUEST_RATES", baseCurrency };
}

function fetchRates(baseCurrency) {
  return dispatch => {
    dispatch(requestRates(baseCurrency));

    var url = new URL(CURRENCY_RATE_API);
    url.searchParams.append("base", baseCurrency);

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          dispatch(setRates(result.rates, null));
        },
        error => {
          const err = { ...error };
          dispatch(setRates([], err));
        }
      );
  };
}

function setBaseCurrency(baseCurrency) {
  return { type: "SET_BASE_CURRENCY", baseCurrency };
}

function requestRate(currencyFrom, currencyTo) {
  return { type: "REQUEST_RATE", currencyFrom, currencyTo };
}

function setRate(rate) {
  return { type: "SET_RATE", rate };
}

function fetchRate(currencyFrom, currencyTo, callback) {
  return dispatch => {
    if (!currencyFrom || !currencyTo) {
      dispatch(setRate(1));
      return;
    }
    if (currencyFrom === currencyTo) {
      dispatch(setRate(1));
      return;
    }

    dispatch(requestRate(currencyFrom, currencyTo));

    var url = new URL(CURRENCY_RATE_API);

    url.searchParams.append("from", currencyFrom);
    url.searchParams.append("to", currencyTo);

    fetch(url)
      .then(res => res.json())
      .then(result => {
        const rate = result.rates[currencyTo];
        dispatch(setRate(rate));
        callback(rate);
      });
  };
}

function setAmountFrom(amountFrom) {
  return { type: "SET_AMOUNT_FROM", amountFrom };
}

function setAmountTo(amountTo) {
  return { type: "SET_AMOUNT_TO", amountTo };
}

function setCurrencyFrom(currencyFrom) {
  return { type: "SET_CURRENCY_FROM", currencyFrom };
}

function setCurrencyTo(currencyTo) {
  return { type: "SET_CURRENCY_TO", currencyTo };
}

function calcAmountTo(amountFrom, rate) {
  return Math.round(amountFrom * rate * 1000) / 1000;
}

function calcAmountFrom(amountTo, rate) {
  return Math.round((amountTo * 1000) / rate) / 1000;
}
