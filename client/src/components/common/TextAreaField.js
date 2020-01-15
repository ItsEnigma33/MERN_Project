import React from "react";
import classname from "classname";
import PropTypes from "prop-types";

function TextAreaField({ name, value, onChange, placeholder, error, info }) {
  return (
    <div className="form-group">
      <textarea
        className={classname("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaField;
