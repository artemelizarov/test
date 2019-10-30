import React from "react";
import { Provider } from "react-redux";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import { compose } from "redux";

import storeFactory from "./redux/store";

// constants
import {
  CURRENCY_LIST_API,
  CURRENCY_RATE_API,
  COUNTRY_BY_COORDINATES_API_URL,
  CURRENCY_BY_COUTNTRY_API_URL
} from "./common/constants";

configure({ adapter: new Adapter() });

global.mockAPICalls = () => {
  const mockFetchPromiseCurrenciesList = Promise.resolve({
    json: () =>
      Promise.resolve({
        EUR: "Euro",
        USD: "United States Dollar"
      })
  });

  const mockFetchPromiseCurrencyRate = Promise.resolve({
    json: () => Promise.resolve({ rates: { USD: 50, EUR: 100 } })
  });

  const mockFetchPromiseCountryByCoordinates = Promise.resolve({
    json: () => Promise.resolve({ countryCode: "usa" })
  });

  const mockFetchPromiseCurrencyByCountryCode = Promise.resolve({
    json: () => Promise.resolve({ currencies: [{ code: "USD" }] })
  });

  const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve({})
  });

  jest.spyOn(global, "fetch").mockImplementation(url => {
    if (url.href.includes(CURRENCY_LIST_API)) {
      return mockFetchPromiseCurrenciesList;
    } else if (url.href.includes(CURRENCY_RATE_API)) {
      return mockFetchPromiseCurrencyRate;
    } else if (url.href.includes(COUNTRY_BY_COORDINATES_API_URL)) {
      return mockFetchPromiseCountryByCoordinates;
    } else if (url.href.includes(CURRENCY_BY_COUTNTRY_API_URL)) {
      return mockFetchPromiseCurrencyByCountryCode;
    }
    return mockFetchPromise;
  });

  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce(success =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3
          }
        })
      )
    )
  };
  global.navigator.geolocation = mockGeolocation;
};

global.React = React;
global.Provider = Provider;
global.store = storeFactory();
global.mount = mount;
global.shallow = shallow;
global.shallowExpect = compose(
  expect,
  toJSON,
  shallow
);
