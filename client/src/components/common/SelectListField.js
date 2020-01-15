import React from "react";
import classname from "classname";
import PropTypes from "prop-types";

function SelectListField({ name, value, onChange, options, error, info }) {
  const optionsList = options.map(op => (
    <option key={op.label} value={op.value}>
      {op.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classname("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {optionsList}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

SelectListField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string
};

export default SelectListField;
