import React from "react";
import { CgPlayListAdd } from 'react-icons/cg';

function Currency(props) {
  const addToInput = () => {
    let copyInput;

    if (props.input === "") {
      copyInput = "1 " + props.code;
      props.setinput(copyInput);
    }

    if (
      (props.input !== "" && props.input[props.input.length - 1] === " ") ||
      props.input.split(" ").length < 3
    ) {
      copyInput = props.input;

      if (props.input[props.input.length - 1] === " ") {
        copyInput = copyInput.trim();
      }

      copyInput = copyInput + " " + props.code;
      props.setinput(copyInput);
    }
  };

  return (
    <div onClick={addToInput} className="currency">
      <div className="code">{props.code}</div>
      <div className="name">{props.name}</div>
      <div className="icon"><CgPlayListAdd/></div>
    </div>
  );
}

export default Currency;
