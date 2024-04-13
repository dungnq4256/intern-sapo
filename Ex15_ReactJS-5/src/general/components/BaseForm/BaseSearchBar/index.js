import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

BaseSearchBar.propTypes = {
    name: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    value: PropTypes.string,
    typingTimeout: PropTypes.number,
    onSubmit: PropTypes.func,
    noBorder: PropTypes.bool,
};

BaseSearchBar.defaultProps = {
    type: "text",
    width: "",
    height: "",
    placeholder: "",
    disabled: false,
    className: "",
    value: "",
    typingTimeout: 500,
    onSubmit: null,
    noBorder: false,
};

function BaseSearchBar(props) {
    // MARK: --- Params ---
    const {
        name,
        type,
        width,
        height,
        placeholder,
        disabled,
        className,
        value,
        typingTimeout,
        onSubmit,
        noBorder,
        onFocus,
    } = props;
    const [text, setText] = useState(value);
    const typingTimeoutRef = useRef(null);

    // MARK: --- Functions ---
    function handleTextChanged(e) {
        const value = e.target.value;
        setText(value);

        if (onSubmit === null) {
            return;
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            onSubmit(value);
        }, typingTimeout);
    }

    return (
        <div className={`BaseSearchBar position-relative ${className}`}>
            <input
                id={name}
                onFocus={onFocus}
                type={type}
                className={`form-control ${noBorder && "border-0"}`}
                style={{
                    width: width,
                    height: height,
                    paddingLeft: "2.5rem",
                    fontSize: "0.9rem",
                }}
                placeholder={placeholder}
                value={text}
                onChange={handleTextChanged}
            />
            <span className="position-absolute">
                <i className="fas fa-search" style={{ color: "#4A5677" }} />
            </span>
        </div>
    );
}

export default BaseSearchBar;
