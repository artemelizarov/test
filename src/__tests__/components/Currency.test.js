import Currency from "../../components/Currency";

describe("render Currency component", () => {
  let wrapper1, wrapper2;

  beforeAll(() => {
    wrapper1 = mount(
      <Currency code="USD" name="United States dollar" rate={55.4} />
    );
    wrapper2 = mount(<Currency code="USD" name="United States dollar" />);
  });

  test("render Currency component", () => {
    expect(wrapper1.find(".Currency").length).toBe(1);
  });

  test("render Currency component whith rate", () => {
    expect(wrapper1.find(".Currency").instance().textContent).toEqual(
      "USD - United States dollar 55.4☆"
    );
  });

  test("render Currency component whithout rate", () => {
    expect(wrapper2.find(".Currency").instance().textContent).toEqual(
      "USD - United States dollar☆"
    );
  });
});

describe("snapshot-test Currency component", () => {
  test("Renders correct properties", () => {
    shallowExpect(
      <Currency code="USD" name="United States dollar" rate={55.4} />
    ).toMatchSnapshot();
  });
});
