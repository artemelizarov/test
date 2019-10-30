// containers, components
import App from "../../containers/App";

describe("render all app", () => {
  let wrapper;

  beforeAll(() => {
    mockAPICalls();

    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("component is render", () => {
    expect(wrapper.find(".App").length).toBe(1);
  });

  test("CurrencyConverter subcomponent is render", () => {
    wrapper.update();
    expect(wrapper.find(".CurrencyConverter").length).toBe(1);
  });
});

describe("snapshot-test App component", () => {
  test("Renders correct properties", () => {
    shallowExpect(
      <Provider store={store}>
        <App />
      </Provider>
    ).toMatchSnapshot();
  });
});
