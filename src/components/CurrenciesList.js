import React, { Component } from "react";
import Currency from "./Currency";
import CurrencySelect from "./CurrencySelect";

class CurrenciesList extends Component {
  baseCurrencyOnChange = event => {
    const value = event.target.value;
    this.props.changeBaseCurrency(value);
  };

  componentDidMount() {
    this.props.changeBaseCurrency(this.props.defaultBaseCurrency);
  }

  render() {
    const {
      baseCurrency,
      errorRates,
      currenciesRates,
      currencies,
      changeFavorite
    } = this.props;

    return (
      <div className="CurrenciesList">
        <h2>Base currency</h2>
        <CurrencySelect
          label="Base currency"
          name="baseCurrency"
          currencies={currencies}
          currency={baseCurrency}
          onChange={this.baseCurrencyOnChange}
        />
        <h2>List of currencies</h2>
        {errorRates && <div>Error: {errorRates.message}</div>}
        <ul>
          {currenciesRates.map(currency => (
            <Currency
              key={currency.code}
              code={currency.code}
              name={currency.name}
              rate={currency.rate}
              favorite={currency.favorite}
              onChangeFavorite={changeFavorite}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default CurrenciesList;
