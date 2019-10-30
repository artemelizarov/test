import {
  changeBaseCurrency,
  changeAmountFrom,
  changeCurrencyFrom,
  changeAmountTo
} from "../../redux/actions";
import storeFactory from "../../redux/store";

describe("store init test", () => {
  let store, state;

  beforeAll(() => {
    store = storeFactory();
    state = store.getState();
  });

  it("store is init", () => {
    expect(state).toEqual({
      currencies: [],
      currenciesList: {
        baseCurrency: "",
        currenciesRates: [],
        errorRates: null,
        favorites: []
      },
      currencyConverter: {
        amountFrom: 1,
        amountTo: 0,
        currencyFrom: "",
        currencyTo: "",
        rate: 0
      },
      defaultCurrency: ""
    });
  });
});

describe("changeBaseCurrency action test", () => {
  let store;

  beforeAll(() => {
    store = storeFactory();
    store.dispatch(changeBaseCurrency("EUR"));
  });

  it("baseCurrency is change", () => {
    const state = store.getState();
    expect(state.currenciesList.baseCurrency).toBe("EUR");
  });
});

describe("changeAmountFrom action test", () => {
  let store;

  beforeAll(() => {
    store = storeFactory();
    store.dispatch(changeAmountFrom(10));
  });

  it("amountFrom is change", () => {
    const state = store.getState();
    expect(state.currencyConverter.amountFrom).toBe(10);
  });
});

describe("changeAmountTo action test", () => {
  let store;

  beforeAll(() => {
    store = storeFactory();
    store.dispatch(changeAmountTo(20));
  });

  it("amountTo is change", () => {
    const state = store.getState();
    expect(state.currencyConverter.amountTo).toBe(20);
  });
});

describe("changeCurrencyFrom action test", () => {
  let store;

  beforeAll(() => {
    store = storeFactory();
    store.dispatch(changeCurrencyFrom("EUR"));
  });

  it("changeCurrencyFrom is change", () => {
    const state = store.getState();
    expect(state.currencyConverter.currencyFrom).toBe("EUR");
  });
});
