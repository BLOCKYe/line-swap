import React, { useState, useEffect } from "react";
import CurrencyList from "./CurrencyList";
import Header from "./Header";
import Input from "./Input";
import { useScroll } from "./useScroll";

function Converter() {
  const [currency, setcurrency] = useState("");
  const [input, setinput] = useState("");
  const { scrollDirection } = useScroll();

  // get currency data
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
      <div
        className={`fixedSection ${scrollDirection === "down" ? "" : "hide"}`}
      >
        <Header />
        <Input input={input} setinput={setinput} currency={currency} />
      </div>
      <CurrencyList input={input} setinput={setinput} currency={currency} />
    </div>
  );
}

export default Converter;
