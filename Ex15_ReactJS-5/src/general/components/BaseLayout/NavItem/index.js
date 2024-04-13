import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

NavItem.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
};

NavItem.defaultProps = {
    className: "",
    text: "",
    icon: "",
    onClick: null,
};

function NavItem(props) {
    const { className, text, icon, onClick } = props;
    return (
        <div className="col-4">
            <div
                className={`NavItem d-flex justify-content-center align-items-center py-3 px-4 ${className}`}
                onClick={onClick}
            >
                <i className={`pe-3 ${icon}`}></i>
                <div className={`NavItemName`}>{text}</div>
            </div>
        </div>
    );
}

export default NavItem;
