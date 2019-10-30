import React, { Component } from "react";
import CurrenciesList from "../containers/CurrenciesList";
import CurrencyConverter from "../containers/CurrencyConverter";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
    this.props.fetchDefaultCurrency();
  }

  render() {
    const { defaultCurrency, currencies } = this.props;

    if (!defaultCurrency || !currencies.length) {
      return <div className="App">Loading...</div>;
    } else {
      return (
        <div className="App">
          <CurrencyConverter />
          <CurrenciesList />
        </div>
      );
    }
  }
}

export default App;
