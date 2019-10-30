import React from "react";

function Currency(props) {
  function onClickFavorite(currency) {
    return () => {
      props.onChangeFavorite(currency);
    };
  }

  return (
    <li className="Currency">
      <span>
        {props.code} - {props.name}
      </span>
      {props.rate ? <span> {props.rate}</span> : null}
      <button
        style={{
          padding: 0,
          border: "none",
          font: "inherit",
          color: "inherit",
          backgroundColor: "transparent",
          outline: "none"
        }}
        onClick={onClickFavorite(props.code)}
      >
        {props.favorite ? <span>&#9733;</span> : <span>&#9734;</span>}
      </button>
    </li>
  );
}

export default Currency;
