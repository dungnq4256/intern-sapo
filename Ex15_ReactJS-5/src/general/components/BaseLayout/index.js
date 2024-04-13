import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";

BaseLayout.propTypes = {
    selected: PropTypes.string,
};

BaseLayout.defaultProps = {
    selected: "category",
};

function BaseLayout(props) {
    const { selected } = props;
    const navigate = useNavigate();
    return (
        <div className="min-vh-100 bg-light d-flex flex-column">
            <Header />
            <div className="container d-flex flex-column">
                <div className="row d-flex justify-content-center p-4">
                    <NavItem
                        className={selected === "category" ? "NavItem_active" : ""}
                        onClick={() => navigate("/category")}
                        icon="fa-solid fa-list"
                        text="Danh mục"
                    />
                    <NavItem
                        className={selected === "inventory" ? "NavItem_active" : ""}
                        onClick={() => navigate("/inventory")}
                        icon="fa-sharp fa-solid fa-warehouse"
                        text="Kho"
                    />
                    <NavItem
                        className={selected === "product" ? "NavItem_active" : ""}
                        onClick={() => navigate("/product")}
                        icon="fa-solid fa-mobile"
                        text="Sản phẩm"
                    />
                </div>
                <div className="w-100 flex-grow-1 align-self-center d-flex flex-column justify-content-between m-1">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default BaseLayout;
