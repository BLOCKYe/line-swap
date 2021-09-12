import React, { useState, useEffect } from "react";
import CurrencyList from "./CurrencyList";
import Header from "./Header";
import Input from "./Input";

function Converter() {
  // get currency data
  const [currency, setcurrency] = useState("");

  useEffect(() => {
    fetch(`https://api.nbp.pl/api/exchangerates/tables/a/?format=json`)
      .then((response) => response.json())
      .then((response) => {
        const pln = {
          currency: "polski złoty",
          code: "PLN",
          mid: 1,
        };
        let rates = [pln, ...response[0].rates];
        setcurrency(rates);
      });
  }, []);

  return (
    <div className="converter">
      <div className="fixedSection">
        <Header />
        <Input currency={currency} />
      </div>
      <CurrencyList currency={currency} />
    </div>
  );
}

export default Converter;
