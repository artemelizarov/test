import {
  COUNTRY_BY_COORDINATES_API_URL,
  CURRENCY_BY_COUTNTRY_API_URL,
  DEFAULT_CURRENCY,
  CURRENCY_LIST_API
} from "../common/constants";

export function getDefaultCurrency(callback) {
  getCoordinates(callback);
}

export function getCurrenciesList(callback) {
  var url = new URL(CURRENCY_LIST_API);

  fetch(url)
    .then(res => res.json())
    .then(
      result => {
        const currencies = [];
        Object.getOwnPropertyNames(result).forEach(code => {
          currencies.push({
            code: code,
            name: result[code],
            rate: 0
          });
        });

        callback(currencies);
      },
      () => {}
    );
}

function getCoordinates(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => getCountryByCoordinates(pos.coords, callback),
      () => callback(DEFAULT_CURRENCY)
    );
  } else {
    callback(DEFAULT_CURRENCY);
  }
}

function getCountryByCoordinates(crd, callback) {
  var url = new URL(COUNTRY_BY_COORDINATES_API_URL);
  url.searchParams.append("lat", crd.latitude);
  url.searchParams.append("lng", crd.longitude);
  url.searchParams.append("username", "Dm1korneev");

  fetch(url)
    .then(res => res.json())
    .then(
      result => {
        const { countryCode } = result;
        getCurrencyByCountryCode(countryCode, callback);
      },
      () => {
        callback(DEFAULT_CURRENCY);
      }
    );
}

function getCurrencyByCountryCode(countryCode, callback) {
  var url = new URL(CURRENCY_BY_COUTNTRY_API_URL + countryCode);

  fetch(url)
    .then(res => res.json())
    .then(
      result => {
        const { currencies } = result;
        if (currencies.length) {
          callback(currencies[0].code);
        }
      },
      () => {
        callback(DEFAULT_CURRENCY);
      }
    );
}
