import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogModal from "general/components/DialogModal";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import inventoryApi from "api/inventoryApi";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import ToastHelper from "general/helpers/ToastHelper";

ModalDetailInventory.propTypes = {
    show: PropTypes.bool,
    isEditMode: PropTypes.bool,
    updateData: PropTypes.func,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
    onExecute: PropTypes.func,
    title: PropTypes.string,
    inventoryInfo: PropTypes.object,
};
ModalDetailInventory.defaultProps = {
    show: null,
    isEditMode: false,
    updateData: null,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
    title: "",
    inventoryInfo: null,
};

function ModalDetailInventory(props) {
    const {
        show,
        isEditMode,
        onClose,
        updateData,
        icon,
        description,
        onExecute,
        title,
        inventoryInfo,
    } = props;
    const [editMode, setEditMode] = useState(false);
    const [close, setClose] = useState(false);
    const [inventoryOnChange, setInventoryOnChange] = useState({});

    useEffect(() => {
        setInventoryOnChange({
            code: inventoryInfo.code,
            name: inventoryInfo.name,
            address: inventoryInfo.address,
        });
        setEditMode(isEditMode);
        isEditMode ? setClose(true) : setClose(false);
        return () => {};
    }, [inventoryInfo, isEditMode]);

    const handelEditInventory = async () => {
        try {
            const isEdited =
                inventoryOnChange.code !== inventoryInfo.code ||
                inventoryOnChange.name !== inventoryInfo.name ||
                inventoryOnChange.address !== inventoryInfo.address;
            if (editMode && isEdited) {
                const res = await inventoryApi.editInventory(
                    inventoryInfo?.id,
                    inventoryOnChange
                );
                if (res.status === 200) {
                    ToastHelper.showSuccess("Cập nhật kho thành công!");
                    updateData(true);
                }
            }
            if (onExecute) {
                onExecute();
            }
            setEditMode(!editMode);
        } catch (error) {
            if (error.response.data === "Already exist code")
                ToastHelper.showError("Mã kho đã tồn tại!");
        }
    };

    return (
        <DialogModal
            show={show}
            close={close}
            onClose={onClose}
            icon={icon}
            description={description}
            onExecute={handelEditInventory}
            title={editMode ? "Chỉnh sửa kho" : "Chi tiết kho"}
            textBtnCancel={editMode ? "Hủy" : "Quay lại"}
            textBtnExecute={editMode ? "Xác nhận" : "Chỉnh sửa"}
        >
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <div className="row mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mã kho: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="InventoryCode"
                            placeholder="Nhập mã kho..."
                            disabled={!editMode}
                            value={inventoryOnChange.code}
                            onChange={(e) =>
                                setInventoryOnChange({
                                    ...inventoryOnChange,
                                    code: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Tên kho: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="InventoryName"
                            placeholder="Nhập tên kho..."
                            disabled={!editMode}
                            value={inventoryOnChange.name}
                            onChange={(e) =>
                                setInventoryOnChange({
                                    ...inventoryOnChange,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Địa chỉ kho: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextArea
                            name="categoryAddress"
                            placeholder="Nhập địa chỉ kho..."
                            disabled={!editMode}
                            value={inventoryOnChange.address}
                            onChange={(e) =>
                                setInventoryOnChange({
                                    ...inventoryOnChange,
                                    address: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </DialogModal>
    );
}

export default ModalDetailInventory;
