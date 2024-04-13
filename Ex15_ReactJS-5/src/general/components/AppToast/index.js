import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

AppToast.propTypes = {};

function AppToast(props) {
    return <ToastContainer style={{ fontSize: "0.8rem" }} />;
}

export default AppToast;
