import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import Trash from "../../../assets/images/trash.png";
import AppButton from "../AppButton";

DialogModal.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.bool,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    size: PropTypes.string,
    description: PropTypes.string,
    onExecute: PropTypes.func,
    title: PropTypes.string,
    textBtnCancel: PropTypes.string,
    textBtnExecute: PropTypes.string,
};

DialogModal.defaultProps = {
    show: null,
    close: true,
    onClose: null,
    icon: "",
    size: "md",
    description: "",
    onExecute: null,
    title: "",
    textBtnCancel: "",
    textBtnExecute: "",
};

function DialogModal(props) {
    const {
        show,
        close,
        onClose,
        icon,
        size,
        description,
        onExecute,
        title,
        textBtnCancel,
        textBtnExecute,
    } = props;
    function handleClose() {
        if (onClose) {
            onClose();
        }
    }
    function handleExecute() {
        if (onExecute) {
            onExecute();
        }
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size={size}
            className="p-0"
        >
            {/* modal header */}
            <Modal.Header className="d-flex align-items-center justify-content-center">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            {/* modal content */}
            <Modal.Body className="d-flex flex-column align-items-center justify-content-center bg-light py-0">
                {icon && <i className={`${icon} fa-6x py-5 my-2`}></i>}
                <p className="text-center font-weight-bold">{description}</p>
                {props.children}
            </Modal.Body>
            {/* modal footer */}
            <Modal.Footer className="d-flex flex-row align-items-center justify-content-center">
                <div className="w-100 d-flex row">
                    <AppButton
                        className="btn-blue flex-grow-1 col me-2"
                        onClick={() => {
                            close && handleClose();
                            handleExecute();
                        }}
                    >
                        {textBtnExecute}
                    </AppButton>
                    <AppButton
                        className="btn-cancel flex-grow-1 col ms-2"
                        onClick={handleClose}
                    >
                        {textBtnCancel}
                    </AppButton>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default DialogModal;
