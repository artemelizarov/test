import CurrencySelect from "../../components/CurrencySelect";

describe("render CurrencySelect component", () => {
  let wrapper, _onChange;

  beforeAll(() => {
    _onChange = jest.fn();

    wrapper = mount(
      <CurrencySelect
        label="Base currency"
        name="baseCurrency"
        currencies={[
          { code: "USD", name: "United States dollar" },
          { code: "EUR", name: "Euro" }
        ]}
        currency="USD"
        onChange={event => {
          _onChange(event.target.value);
        }}
      />
    );

    let input;
    input = wrapper.find("select").first();
    input.instance().value = "EUR";
    input.simulate("change");
  });

  test("render CurrencySelect component", () => {
    expect(wrapper.find(".CurrencySelect").length).toBe(1);
  });

  test("_onChange is called", () => {
    expect(_onChange).toBeCalledWith("EUR");
  });
});

describe("snapshot-test CurrencySelect component", () => {
  test("Renders correct properties", () => {
    shallowExpect(
      <CurrencySelect
        label="Base currency"
        name="baseCurrency"
        currencies={[
          { code: "USD", name: "United States dollar" },
          { code: "EUR", name: "Euro" }
        ]}
        currency="USD"
        onChange={jest.fn()}
      />
    ).toMatchSnapshot();
  });
});
