import React from "react";
import classname from "classname";

function inputField({
  name,
  value,
  type,
  onChange,
  placeholder,
  error,
  info,
  disabled
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classname("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default inputField;
