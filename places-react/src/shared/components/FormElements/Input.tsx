import React from "react";

import "./Input.css";

interface InputProps {
  id: string;
  type: string;
  placeholder?: string;
  label: string;
  rows?: number;
  element: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  placeholder,
  label,
  rows,
  ...props
}) => {
  const element: any =
    props.element === "input" ? (
      <input id={id} type={type} placeholder={placeholder} />
    ) : (
      <textarea id={id} rows={rows || 3} />
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={id}>{label}</label>
      {element}
    </div>
  );
};

export default Input;
