import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useState } from "react";

BaseNumberField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
    error: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    additionLabelClassName: PropTypes.string,
    additionalInputClassName: PropTypes.string,
    autoComplete: PropTypes.string,
    labelStyle: PropTypes.object,
    require: PropTypes.bool,
};

BaseNumberField.defaultProps = {
    label: "",
    value: "",
    placeholder: "",
    onChange: null,
    disabled: false,
    text: "",
    className: "form-group",
    additionLabelClassName: "text-muted",
    additionalInputClassName: "",
    autoComplete: "on",
    labelStyle: {},
    require: false,
};

function BaseNumberField(props) {
    const {
        name,
        value,
        min,
        max,
        onChange,
        error,
        label,
        placeholder,
        disabled,
        text,
        className,
        additionLabelClassName,
        additionalInputClassName,
        autoComplete,
        labelStyle,
        require,
    } = props;

    const [isError, setError] = useState(false);

    const handleOnBlur = () => {
        if (value.trim() === "") {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <div className="BaseNumberField w-100">
            <div className={className}>
                {label && (
                    <div className={`${require && "d-flex flex-row"}`}>
                        <label
                            className={additionLabelClassName}
                            htmlFor={name}
                            style={labelStyle}
                        >
                            {label}
                        </label>
                        {require && (
                            <span
                                className="font-weight-boldest ml-1"
                                style={{ color: "#E92E4E" }}
                            >{`*`}</span>
                        )}
                    </div>
                )}
                <div
                    className={`BaseNumberField_Group rounded input-group ${
                        !disabled && "bg-white"
                    }  d-flex flex-row  justify-content-between ${
                        disabled && "BaseNumberField_Disabled"
                    } ${isError && "BaseNumberField_Group-invalid"}`}
                >
                    <input
                        className={`ps-3 BaseNumberField_Input w-100 rounded border-0 bg-transparent ${additionalInputClassName}`}
                        id={name}
                        disabled={disabled}
                        type="number"
                        name={name}
                        value={value}
                        min={min}
                        max={max}
                        onChange={onChange}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        onBlur={handleOnBlur}
                    />
                </div>
                {text.length > 0 && (
                    <span className="form-text text-muted">{text}</span>
                )}
                {isError && (
                    <div className="mt-1 me-2">
                        <div className="err-text-field">{error}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BaseNumberField;
