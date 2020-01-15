import React from "react";
import classname from "classname";
import PropTypes from "prop-types";

function IconInputField({
  name,
  value,
  type,
  onChange,
  placeholder,
  error,
  info,
  disabled,
  icon
}) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text">
        <i className={icon}></i>
      </span>
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

IconInputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  info: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string.isRequired
};

IconInputField.defautProps = {
  type: "text"
};

export default IconInputField;
