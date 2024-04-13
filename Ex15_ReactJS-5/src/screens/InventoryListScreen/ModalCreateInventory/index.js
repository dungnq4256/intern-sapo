import inventoryApi from "api/inventoryApi";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import PropTypes from "prop-types";
import { useState } from "react";

ModalCreateInventory.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.bool,
    updateData: PropTypes.func,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
};
ModalCreateInventory.defaultProps = {
    show: null,
    close: true,
    updateData: null,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
    title: "",
};

function ModalCreateInventory(props) {
    const {
        show,
        close,
        updateData,
        onClose,
        icon,
        description,
        onExecute,
        title,
    } = props;
    const [inventoryOnChange, setInventoryOnChange] = useState({
        name: "",
        code: "",
        address: "",
    });
    const resetText = () => {
        setInventoryOnChange({
            name: "",
            code: "",
            address: "",
        });
    };

    const handleClose = () => {
        resetText();
        if (onClose) {
            onClose();
        }
    };

    const handelCreateInventory = async () => {
        try {
            if (
                inventoryOnChange.code === "" ||
                inventoryOnChange.name === "" ||
                inventoryOnChange.address === ""
            ) {
                ToastHelper.showError("Vui lòng nhập đủ các trường dữ liệu!");
                return;
            }
            const res = await inventoryApi.createInventory(inventoryOnChange);
            if (res.status === 200)
                ToastHelper.showSuccess("Thêm kho thành công!");
            updateData(true);
            resetText();
        } catch (error) {
            if (error.response.data === "Already exist code")
                ToastHelper.showError("Mã kho đã tồn tại!");
        }
    };

    return (
        <DialogModal
            show={show}
            onClose={handleClose}
            icon={icon}
            description={description}
            onExecute={handelCreateInventory}
            title="Thêm kho"
            textBtnCancel="Hủy"
            textBtnExecute="Xác nhận"
        >
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mã kho: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="InventoryCode"
                            placeholder="Nhập mã kho..."
                            value={inventoryOnChange.code}
                            onChange={(e) =>
                                setInventoryOnChange({
                                    ...inventoryOnChange,
                                    code: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập mã kho"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Tên kho: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="InventoryName"
                            placeholder="Nhập tên kho..."
                            value={inventoryOnChange.name}
                            onChange={(e) =>
                                setInventoryOnChange({
                                    ...inventoryOnChange,
                                    name: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập tên kho"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Địa chỉ kho: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextArea
                            name="inventoryAddress"
                            placeholder="Nhập địa chỉ kho..."
                            value={inventoryOnChange.address}
                            onChange={(e) =>
                                setInventoryOnChange({
                                    ...inventoryOnChange,
                                    address: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập địa chỉ kho"
                        />
                    </div>
                </div>
            </div>
        </DialogModal>
    );
}

export default ModalCreateInventory;
