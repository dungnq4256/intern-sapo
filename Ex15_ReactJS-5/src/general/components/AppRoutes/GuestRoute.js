import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import UserHelper from "general/helpers/UserHelper";
import { AuthContext } from "AuthContext";

GuestRoute.propTypes = {};

function GuestRoute(props) {
    const { isLoggedIn } = useContext(AuthContext);
    return !isLoggedIn ? props.children : <Navigate to="/category" />;
}

export default GuestRoute;
