import React, { Component } from "react";
import CurrencySelect from "./CurrencySelect";
import { DEFAULT_CURRENCY, DEFAULT_CURRENCY_2 } from "../common/constants";

class CurrencyConverter extends Component {
  componentDidMount() {
    this.props.changeCurrencyFrom(this.props.defaultCurrency);
    this.props.changeCurrencyTo(
      this.props.defaultCurrency === DEFAULT_CURRENCY
        ? DEFAULT_CURRENCY_2
        : DEFAULT_CURRENCY
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    if (name === "currencyFrom") {
      this.props.changeCurrencyFrom(value);
    } else if (name === "currencyTo") {
      this.props.changeCurrencyTo(value);
    }
  };

  handleAmountFromChange = event => {
    const value = +event.target.value;
    this.props.changeAmountFrom(value);
  };

  handleAmountToChange = event => {
    const value = +event.target.value;
    this.props.changeAmountTo(value);
  };

  render() {
    const {
      currencies,
      currencyTo,
      currencyFrom,
      amountFrom,
      amountTo
    } = this.props;

    return (
      <div className="CurrencyConverter">
        <h2>Currency converter</h2>
        <div>
          <CurrencySelect
            label="Currency from"
            name="currencyFrom"
            currencies={currencies}
            currency={currencyFrom}
            onChange={this.handleChange}
          />
          <CurrencySelect
            label="Currency to"
            name="currencyTo"
            currencies={currencies}
            currency={currencyTo}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>
            Amount from:
            <input
              name="amountFrom"
              type="number"
              value={amountFrom}
              onChange={this.handleAmountFromChange}
            />
          </label>

          <label>
            Amount to:
            <input
              name="amountTo"
              type="number"
              value={amountTo}
              onChange={this.handleAmountToChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;
