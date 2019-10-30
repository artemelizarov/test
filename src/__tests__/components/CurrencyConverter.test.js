import CurrencyConverter from "../../components/CurrencyConverter";

describe("render CurrencyConverter component", () => {
  let wrapper,
    _changeCurrencyFrom,
    _changeCurrencyTo,
    _changeAmountFrom,
    _changeAmountTo;

  beforeAll(() => {
    _changeCurrencyFrom = jest.fn();
    _changeCurrencyTo = jest.fn();
    _changeAmountFrom = jest.fn();
    _changeAmountTo = jest.fn();

    wrapper = mount(
      <CurrencyConverter
        defaultCurrency="USD"
        currencies={[
          { code: "USD", name: "United States dollar" },
          { code: "EUR", name: "Euro" }
        ]}
        changeCurrencyFrom={_changeCurrencyFrom}
        changeCurrencyTo={_changeCurrencyTo}
        changeAmountFrom={_changeAmountFrom}
        changeAmountTo={_changeAmountTo}
      />
    );

    let input;
    input = wrapper.find("select[name='currencyFrom']").first();
    input.instance().value = "EUR";
    input.simulate("change");

    input = wrapper.find("select[name='currencyTo']").first();
    input.instance().value = "USD";
    input.simulate("change");

    input = wrapper.find("input[name='amountFrom']").first();
    input.instance().value = 10;
    input.simulate("change");

    input = wrapper.find("input[name='amountTo']").first();
    input.instance().value = 20;
    input.simulate("change");
  });

  test("CurrencyConverter render", () => {
    expect(wrapper.find(".CurrencyConverter").length).toBe(1);
  });

  test("_changeCurrencyFrom is called", () => {
    expect(_changeCurrencyFrom).toBeCalledWith("EUR");
  });

  test("_changeCurrencyTo is called", () => {
    expect(_changeCurrencyTo).toBeCalledWith("USD");
  });

  test("_changeAmountFrom is called", () => {
    expect(_changeAmountFrom).toBeCalledWith(10);
  });

  test("_changeAmountTo is called", () => {
    expect(_changeAmountTo).toBeCalledWith(20);
  });
});

describe("snapshot-test CurrencyConverter component", () => {
  test("Renders correct properties", () => {
    shallowExpect(
      <CurrencyConverter
        defaultCurrency="USD"
        currencies={[
          { code: "USD", name: "United States dollar" },
          { code: "EUR", name: "Euro" }
        ]}
        changeCurrencyFrom={jest.fn()}
        changeCurrencyTo={jest.fn()}
        changeAmountFrom={jest.fn()}
        changeAmountTo={jest.fn()}
      />
    ).toMatchSnapshot();
  });
});
