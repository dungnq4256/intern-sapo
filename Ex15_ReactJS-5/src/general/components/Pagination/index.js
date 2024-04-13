import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import AppData from "general/constants/AppData";
import './style.scss'

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeSize: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
    currentPage: 1,
    size: 10,
    totalPages: 0,
    onChangePage: null,
    onChangeSize: null,
};

function Pagination(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { currentPage, size, totalPages, onChangePage, onChangeSize } = props;

    const arrButtons = [];
    let firstIndex =
        currentPage - 3 > 0
            ? currentPage - 3 > totalPages - 5
                ? totalPages - 5
                : currentPage - 3
            : 0;
    if (firstIndex < 0) firstIndex = 0;
    let lastIndex =
        currentPage + 1 > totalPages - 1
            ? totalPages - 1
            : currentPage + 1 < 4
            ? 4
            : currentPage + 1;
    if (lastIndex > totalPages - 1) {
        lastIndex = totalPages - 1;
    }
    for (firstIndex; firstIndex <= lastIndex; firstIndex++) {
        arrButtons.push(
            <button
                key={firstIndex}
                page={firstIndex + 1}
                onClick={handlePageChange}
                className={`Pagination_Btn me-2 ${
                    firstIndex === currentPage - 1
                        ? "Pagination_Btn--active"
                        : ""
                }`}
            >
                {firstIndex + 1}
            </button>
        );
    }

    function handlePageChange(e) {
        const newPage = e.target.getAttribute("page");
        if (onChangePage && parseInt(newPage) !== currentPage) {
            onChangePage(newPage);
        }
    }

    const handleSizeChange = (e) => {
        const value = e.target.innerText;
        const intValue = parseInt(value);
        if (onChangeSize && intValue) {
            onChangeSize(intValue);
        }
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="Pagination w-100">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex flex-wrap py-2 me-3">
                    <button
                        onClick={() => {
                            if (onChangePage) {
                                onChangePage(1);
                            }
                        }}
                        className="Pagination_Btn me-2"
                        disabled={currentPage <= 1}
                    >
                        <i className="fa-solid fa-angles-left"></i>
                    </button>
                    <button
                        onClick={() => {
                            if (onChangePage) {
                                onChangePage(currentPage - 1);
                            }
                        }}
                        className="Pagination_Btn me-2"
                        disabled={currentPage <= 1}
                    >
                        <i className="fa-solid fa-angle-left"></i>
                    </button>

                    {arrButtons}

                    <button
                        onClick={() => {
                            if (onChangePage) {
                                onChangePage(currentPage + 1);
                            }
                        }}
                        className="Pagination_Btn me-2"
                        disabled={currentPage >= totalPages}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                    <button
                        onClick={() => {
                            if (onChangePage) {
                                onChangePage(totalPages);
                            }
                        }}
                        className="Pagination_Btn me-2"
                        disabled={currentPage >= totalPages}
                    >
                        <i className="fa-solid fa-angles-right"></i>
                    </button>
                </div>

                <div className="Pagination_Dropdown d-flex align-items-center">
                    <p className='m-0 me-2'>Số lượng tối đa trên một trang</p>
                    <Dropdown
                        isOpen={dropdownOpen}
                        toggle={handleDropdownToggle}
                        style={{ width: "3rem" }}
                        size="sm"
                    >
                        <DropdownToggle
                            caret
                            className="Pagination_DropdownToggle d-flex align-items-center justify-content-between btn-light"
                        >
                            {size}
                        </DropdownToggle>
                        <DropdownMenu>
                            {AppData.perPageItems.map((item, index) => {
                                return (
                                    <DropdownItem
                                        key={index}
                                        active={item.value == size}
                                        onClick={handleSizeChange}
                                    >
                                        {item.value}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
