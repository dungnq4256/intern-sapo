import categoryApi from "api/categoryApi";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import PropTypes from "prop-types";
import { useState } from "react";

ModalCreateCategory.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.bool,
    updateData: PropTypes.func,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
};
ModalCreateCategory.defaultProps = {
    show: null,
    close: true,
    updateData: null,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
    title: "",
};

function ModalCreateCategory(props) {
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
    const [categoryOnChange, setCategoryOnChange] = useState({
        name: "",
        code: "",
        description: "",
    });
    const resetText = () => {
        setCategoryOnChange({
            name: "",
            code: "",
            description: "",
        });
    };
    const handleClose = () => {
        resetText();
        if (onClose) {
            onClose();
        }
    };
    const handelCreateCategory = async () => {
        try {
            if (
                categoryOnChange.code === "" ||
                categoryOnChange.name === "" ||
                categoryOnChange.description === ""
            ) {
                ToastHelper.showError("Vui lòng nhập đủ các trường dữ liệu!");
                return;
            }
            const res = await categoryApi.createCategory(categoryOnChange);
            if (res.status === 200)
                ToastHelper.showSuccess("Thêm danh mục thành công!");
            updateData(true);
            resetText();
        } catch (error) {
            if (error.response.data === "Already exist code")
                ToastHelper.showError("Mã danh mục đã tồn tại!");
        }
    };

    return (
        <DialogModal
            show={show}
            onClose={handleClose}
            icon={icon}
            description={description}
            onExecute={handelCreateCategory}
            title="Thêm danh mục"
            textBtnCancel="Hủy"
            textBtnExecute="Xác nhận"
        >
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mã danh mục: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="categoryCode"
                            placeholder="Nhập mã danh mục..."
                            value={categoryOnChange.code}
                            onChange={(e) =>
                                setCategoryOnChange({
                                    ...categoryOnChange,
                                    code: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập mã danh mục"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Tên danh mục: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="categoryName"
                            placeholder="Nhập tên danh mục..."
                            value={categoryOnChange.name}
                            onChange={(e) =>
                                setCategoryOnChange({
                                    ...categoryOnChange,
                                    name: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập tên danh mục"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-between mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Mô tả danh mục: </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                        <BaseTextArea
                            name="categoryDescription"
                            placeholder="Nhập mô tả danh mục..."
                            value={categoryOnChange.description}
                            onChange={(e) =>
                                setCategoryOnChange({
                                    ...categoryOnChange,
                                    description: e.target.value,
                                })
                            }
                            error="Bạn chưa nhập mô tả danh mục"
                        />
                    </div>
                </div>
            </div>
        </DialogModal>
    );
}

export default ModalCreateCategory;
