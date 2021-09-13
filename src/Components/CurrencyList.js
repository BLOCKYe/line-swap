import React from "react";
import Currency from "./Currency";

function CurrencyList(props) {
  return (
    <div className="list m40">
      <div className="title">List of currencies</div>
      <div className="container">
        {[...props.currency].map((e) => (
          <Currency
            input={props.input}
            setinput={props.setinput}
            code={e.code}
            name={e.currency}
            key={e.code}
          />
        ))}
      </div>
    </div>
  );
}

export default CurrencyList;
