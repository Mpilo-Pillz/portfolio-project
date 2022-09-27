import React, { useEffect, useReducer } from "react";
import { validate } from "../../util/validators";

import "./Input.css";

type InputValidator = { type: string };
interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  label: string;
  rows?: number;
  element: string;
  errorText: string;
  validators: InputValidator[];
  value?: string;
  valid?: boolean;
  onInput: (id: string, inputStateVaue: string, isValid: boolean) => any;
}

// does not depend on component inputs
const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<InputProps> = ({
  id,
  type,
  placeholder,
  label,
  rows,
  errorText,
  validators,
  onInput,
  ...props
}) => {
  // arg1 is the function t act on the state
  // arg2 is the initial state
  // receives current state and updates it based on action received and retruns new state
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  const changeHandler = (event: any) => {
    dispatch({ type: "CHANGE", val: event.target.value, validators });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element: any =
    props.element === "input" ? (
      <input
        id={id}
        type={type ?? ""}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
