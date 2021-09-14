import React, { useState, useEffect } from "react";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { GoX } from "react-icons/go";

function Input(props) {
  const [value, setValue] = useState("0");
  const [valueAfter, setValueAfter] = useState("0");
  const [from, setFrom] = useState("-");
  const [to, setTo] = useState("-");
  const [fromName, setfromName] = useState("-");
  const [toName, setToName] = useState("-");

  useEffect(() => {
    const newInput = props.input.split(" ");
    if (props.input === "") clearValues();
    if (newInput[0] > 999999999) newInput[0] = 999999999;
    if (newInput.length > 2) {
      findName(newInput[0] > 1 ? newInput[0] : 1, newInput[1], newInput[2]);
    }
  }, [props.input]);

  const handleInput = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
    props.setinput(e.target.value);
  };

  const findName = (newValue, first, second) => {
    const indexFrom = props.currency.findIndex((x) => x.code === first);
    const indexTo = props.currency.findIndex((x) => x.code === second);

    if (indexFrom > -1 && indexTo > -1) {
      setfromName(props.currency[indexFrom].currency);
      setFrom(first);
    }

    if (indexTo > -1 && indexFrom > -1) {
      setToName(props.currency[indexTo].currency);
      setTo(second);

      setRate(newValue, indexFrom, indexTo);
    }
  };

  const setRate = (newValue, indexFrom, indexTo) => {
    const rate = props.currency[indexFrom].mid / props.currency[indexTo].mid;
    setValue(newValue);
    setValueAfter((newValue * rate).toFixed(2));
  };

  const reverse = () => {
    const copy = props.input.split(" ");
    if (copy.length > 2) {
      const bufor = copy[1];
      copy[1] = copy[2];
      copy[2] = bufor;
      props.setinput(copy[0] + " " + copy[1] + " " + copy[2]);
    }
  };

  const clearValues = () => {
    setValue("0");
    setValueAfter("0");
    setfromName("-");
    setFrom("-");
    setTo("-");
    setToName("-");
  };

  return (
    <div className="input">
      <div className="input-container m40">
        <input
          className="input-btn"
          onChange={handleInput}
          type="text"
          value={props.input}
          placeholder="example: 300 EUR PLN"
        ></input>
        <div
          onClick={() => {
            props.setinput("");
          }}
          className="icon-del"
        >
          <GoX />
        </div>
      </div>

      <div className="exchange-container">
        <div className="value-l m20">{value}</div>
        <div className="value-r m20">
          {parseFloat(valueAfter).toLocaleString()}
        </div>
        <div className="from-l m20">{from}</div>
        <div onClick={reverse} className="icon">
          <CgArrowsExchangeAlt />
        </div>
        <div className="to-r m20">{to}</div>
        <div className="name-l">{fromName}</div>
        <div className="name-r">{toName}</div>
      </div>
    </div>
  );
}

export default Input;
