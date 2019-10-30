import React from "react";

function CurrencySelect(props) {
  const { label, onChange, currencies, name } = props;
  const currencyCode = props.currency;

  return (
    <div className="CurrencySelect">
      <label htmlFor={name}>{label}</label>
      <select name={name} value={currencyCode} onChange={onChange}>
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>
            {currency.code + " - " + currency.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelect;
