import React, { useState, useEffect } from "react";

function Input() {
  const [input, setinput] = useState("");
  const [value, setValue] = useState("");
  const [valueAfter, setValueAfter] = useState("");

  const [currency, setcurrency] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromName, setfromName] = useState("");
  const [toName, setToName] = useState("");

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

  const handleInput = (e) => {
    setinput(e.target.value);
    const newInput = e.target.value.toUpperCase().split(" ");

    if (newInput.length > 2) {
      findName(newInput[0] > 1 ? newInput[0] : 1, newInput[1], newInput[2]);
    }

    if (e.target.value === "") {
      setValue("");
      setValueAfter("");
      setfromName("");
      setToName("");
      setTo("");
      setFrom("");
    }
  };

  const findName = (newValue, first, second) => {
    const indexFrom = currency.findIndex((x) => x.code === first);
    const indexTo = currency.findIndex((x) => x.code === second);

    if (indexFrom > -1 && indexTo > -1) {
      setfromName(currency[indexFrom].currency);
      setFrom(first);
      setValue(newValue);
    }

    if (indexTo > -1 && indexFrom > -1) {
      setToName(currency[indexTo].currency);
      setTo(second);
      const rate = currency[indexFrom].mid / currency[indexTo].mid;
      setValueAfter((newValue * rate).toFixed(2));
    }
  };

  return (
    <div className="input">
      <input
        className="input-btn m20"
        onChange={handleInput}
        type="text"
        value={input}
      ></input>
      <div className="exchange-container">
        <div className="tab-l m20">{value}</div>
        <div className="tab-r m20">{valueAfter}</div>
      </div>
      <div className="exchange-container-code">
        <div className="tab-l m10">{from}</div>
        <div className="tab-r m10">{to}</div>
      </div>
      <div className="exchange-container-names">
        <div className="tab-l">{fromName}</div>
        <div className="tab-r">{toName}</div>
      </div>
    </div>
  );
}

export default Input;
