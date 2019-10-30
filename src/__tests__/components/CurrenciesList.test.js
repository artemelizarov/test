import CurrenciesList from "../../components/CurrenciesList";

describe("render CurrenciesList component", () => {
  let wrapper, _changeBaseCurrency;

  beforeAll(() => {
    _changeBaseCurrency = jest.fn();

    wrapper = mount(
      <CurrenciesList
        defaultBaseCurrency="USD"
        currencies={[
          { code: "USD", name: "United States dollar" },
          { code: "EUR", name: "Euro" }
        ]}
        currenciesRates={[
          { code: "USD", name: "United States dollar", rate: 1 },
          { code: "EUR", name: "Euro", rate: 2 }
        ]}
        changeBaseCurrency={_changeBaseCurrency}
      />
    );

    let input;
    input = wrapper.find("select").first();
    input.instance().value = "EUR";
    input.simulate("change");
  });

  test("CurrenciesList render", () => {
    expect(wrapper.find(".CurrenciesList").length).toBe(1);
  });

  test("_changeBaseCurrency is called", () => {
    expect(_changeBaseCurrency).toBeCalledWith("EUR");
  });
});

describe("snapshot-test CurrenciesList component", () => {
  test("Renders correct properties", () => {
    shallowExpect(
      <CurrenciesList
        defaultBaseCurrency="USD"
        currencies={[
          { code: "USD", name: "United States dollar" },
          { code: "EUR", name: "Euro" }
        ]}
        currenciesRates={[
          { code: "USD", name: "United States dollar", rate: 1 },
          { code: "EUR", name: "Euro", rate: 2 }
        ]}
        changeBaseCurrency={jest.fn()}
      />
    ).toMatchSnapshot();
  });
});
