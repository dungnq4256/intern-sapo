import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogModal from "general/components/DialogModal";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import categoryApi from "api/categoryApi";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import ToastHelper from "general/helpers/ToastHelper";

ModalDetailCategory.propTypes = {
    show: PropTypes.bool,
    isEditMode: PropTypes.bool,
    updateData: PropTypes.func,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
    onExecute: PropTypes.func,
    title: PropTypes.string,
    categoryInfo: PropTypes.object,
};
ModalDetailCategory.defaultProps = {
    show: null,
    isEditMode: false,
    updateData: null,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
    title: "",
    categoryInfo: null,
};

function ModalDetailCategory(props) {
    const {
        show,
        isEditMode,
        onClose,
        updateData,
        icon,
        description,
        onExecute,
        title,
        categoryInfo,
    } = props;
    const [editMode, setEditMode] = useState(false);
    const [close, setClose] = useState(false);
    const [categoryOnChange, setCategoryOnChange] = useState({});

    useEffect(() => {
        setCategoryOnChange({
            code: categoryInfo.code,
            name: categoryInfo.name,
            description: categoryInfo.description,
        });
        setEditMode(isEditMode);
        isEditMode ? setClose(true) : setClose(false);
        return () => {};
    }, [categoryInfo, isEditMode]);

    const handelEditCategory = async () => {
        try {
            const isEdited =
                categoryOnChange.code !== categoryInfo.code ||
                categoryOnChange.name !== categoryInfo.name ||
                categoryOnChange.description !== categoryInfo.description;
            if (editMode && isEdited) {
                const res = await categoryApi.editCategory(
                    categoryInfo?.id,
                    categoryOnChange
                );
                if (res.status === 200) {
                    ToastHelper.showSuccess("Cập nhật danh mục thành công!");
                    updateData(true);
                }
            }
            if (onExecute) {
                onExecute();
            }
            setEditMode(!editMode);
        } catch (error) {
            if (error.response.data === "Already exist code")
                ToastHelper.showError("Mã danh mục đã tồn tại!");
        }
    };

    return (
        <DialogModal
            show={show}
            close={close}
            onClose={onClose}
            icon={icon}
            description={description}
            onExecute={handelEditCategory}
            title={editMode ? "Chỉnh sửa danh mục" : "Chi tiết danh mục"}
            textBtnCancel={editMode ? "Hủy" : "Quay lại"}
            textBtnExecute={editMode ? "Xác nhận" : "Chỉnh sửa"}
        >
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <div className="row mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mã danh mục: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="categoryCode"
                            placeholder="Nhập mã danh mục..."
                            disabled={!editMode}
                            value={categoryOnChange.code}
                            onChange={(e) =>
                                setCategoryOnChange({
                                    ...categoryOnChange,
                                    code: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Tên danh mục: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="categoryName"
                            placeholder="Nhập tên danh mục..."
                            disabled={!editMode}
                            value={categoryOnChange.name}
                            onChange={(e) =>
                                setCategoryOnChange({
                                    ...categoryOnChange,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mô tả danh mục: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextArea
                            name="categoryDescription"
                            placeholder="Nhập mô tả danh mục..."
                            disabled={!editMode}
                            value={categoryOnChange.description}
                            onChange={(e) =>
                                setCategoryOnChange({
                                    ...categoryOnChange,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </DialogModal>
    );
}

export default ModalDetailCategory;
