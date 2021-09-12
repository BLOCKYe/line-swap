import React, { useState } from "react";

function Input(props) {
  const [input, setinput] = useState("");
  const [value, setValue] = useState("");
  const [valueAfter, setValueAfter] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromName, setfromName] = useState("");
  const [toName, setToName] = useState("");

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
    const indexFrom = props.currency.findIndex((x) => x.code === first);
    const indexTo = props.currency.findIndex((x) => x.code === second);

    if (indexFrom > -1 && indexTo > -1) {
      setfromName(props.currency[indexFrom].currency);
      setFrom(first);
      setValue(newValue);
    }

    if (indexTo > -1 && indexFrom > -1) {
      setToName(props.currency[indexTo].currency);
      setTo(second);
      const rate = props.currency[indexFrom].mid / props.currency[indexTo].mid;
      setValueAfter((newValue * rate).toFixed(2));
    }
  };

  return (
    <div className="input">
      <input
        className="input-btn m40"
        onChange={handleInput}
        type="text"
        value={input}
      ></input>

      <div className="exchange-container">
        <div className="value-l m20">{value}</div>
        <div className="value-r m20">{valueAfter}</div>
        <div className="from-l m10">{from}</div>
        <div className="icon"></div>
        <div className="to-r m10">{to}</div>
        <div className="name-l">{fromName}</div>
        <div className="name-r">{toName}</div>
      </div>
    </div>
  );
}

export default Input;
