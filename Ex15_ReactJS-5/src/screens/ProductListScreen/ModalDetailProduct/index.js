import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DialogModal from "general/components/DialogModal";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import productApi from "api/productApi";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import ToastHelper from "general/helpers/ToastHelper";
import { AuthContext } from "AuthContext";
import BaseDropdown from "general/components/BaseForm/BaseDropdown";
import BaseNumberField from "general/components/BaseForm/BaseNumberField";

ModalDetailProduct.propTypes = {
    show: PropTypes.bool,
    isEditMode: PropTypes.bool,
    updateData: PropTypes.func,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
    onExecute: PropTypes.func,
    title: PropTypes.string,
    productInfo: PropTypes.object,
};
ModalDetailProduct.defaultProps = {
    show: null,
    isEditMode: false,
    updateData: null,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
    title: "",
    productInfo: null,
};

function ModalDetailProduct(props) {
    const {
        show,
        isEditMode,
        onClose,
        updateData,
        icon,
        description,
        onExecute,
        title,
        productInfo,
    } = props;
    const [editMode, setEditMode] = useState(false);
    const [close, setClose] = useState(false);
    const { categoryOptions, inventoryOptions } = useContext(AuthContext);
    const [productOnChange, setProductOnChange] = useState({});
    useEffect(() => {
        setProductOnChange({
            code: productInfo.code,
            name: productInfo.name,
            description: productInfo.description,
            category_id: productInfo.category_id,
            inventory_id: productInfo.inventory_id,
            image: productInfo.image,
            price: productInfo.price?.toString(),
            quantity: productInfo.quantity?.toString(),
            sell: productInfo.sell?.toString(),
        });
        isEditMode ? setClose(true) : setClose(false);
        setEditMode(isEditMode);
        return () => {};
    }, [productInfo, isEditMode]);

    const handelEditProduct = async () => {
        const isEdited =
            productOnChange.code !== productInfo.code ||
            productOnChange.name !== productInfo.name ||
            productOnChange.description !== productInfo.description ||
            productOnChange.category_id !== productInfo.category_id ||
            productOnChange.inventory_id !== productInfo.inventory_id ||
            productOnChange.image !== productInfo.image ||
            productOnChange.price !== productInfo.price?.toString() ||
            productOnChange.quantity !== productInfo.quantity?.toString() ||
            productOnChange.sell !== productInfo.sell?.toString();
        if (editMode && isEdited) {
            const res = await productApi.editProduct(
                productInfo?.id,
                productOnChange
            );
            if (res.status === 200) {
                ToastHelper.showSuccess("Cập nhật sản phẩm thành công!");
                updateData(true);
            }
        }
        if (onExecute) {
            onExecute();
        }
        setEditMode(!editMode);
    };

    return (
        <DialogModal
            show={show}
            close={close}
            onClose={onClose}
            icon={icon}
            size="lg"
            description={description}
            onExecute={handelEditProduct}
            title={editMode ? "Chỉnh sửa sản phẩm" : "Chi tiết sản phẩm"}
            textBtnCancel={editMode ? "Hủy" : "Quay lại"}
            textBtnExecute={editMode ? "Xác nhận" : "Chỉnh sửa"}
        >
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <div className="row w-100">
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">Mã sản phẩm: </div>
                            <div className="w-100 px-3">
                                <BaseTextField
                                    name="ProductCode"
                                    placeholder="Nhập mã sản phẩm..."
                                    disabled={!editMode}
                                    value={productOnChange.code}
                                    onChange={(e) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            code: e.target.value,
                                        })
                                    }
                                    error="Bạn chưa nhập tên sản phẩm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">Tên sản phẩm: </div>
                            <div className="w-100 px-3">
                                <BaseTextField
                                    name="ProductName"
                                    placeholder="Nhập tên sản phẩm..."
                                    disabled={!editMode}
                                    value={productOnChange.name}
                                    onChange={(e) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            name: e.target.value,
                                        })
                                    }
                                    error="Bạn chưa nhập tên sản phẩm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">
                                Mô tả sản phẩm:
                            </div>
                            <div className="w-100 px-3">
                                <BaseTextArea
                                    name="ProductDescription"
                                    placeholder="Nhập mô tả sản phẩm..."
                                    disabled={!editMode}
                                    value={productOnChange.description}
                                    onChange={(e) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            description: e.target.value,
                                        })
                                    }
                                    error="Bạn chưa nhập mô tả sản phẩm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">Ảnh sản phẩm: </div>
                            <div className="w-100 px-3">
                                <BaseTextArea
                                    name="ProductImage"
                                    placeholder="Nhập ảnh sản phẩm..."
                                    disabled={!editMode}
                                    value={productOnChange.image}
                                    onChange={(e) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            image: e.target.value,
                                        })
                                    }
                                    error="Bạn chưa nhập ảnh sản phẩm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">Kho sản phẩm:</div>
                            <div className="w-100 px-3">
                                <BaseDropdown
                                    name="inventoryID"
                                    options={inventoryOptions}
                                    disabled={!editMode}
                                    dropdownInitialValue="Chọn kho sản phẩm"
                                    value={productOnChange.inventory_id}
                                    onValueChanged={(value) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            inventory_id: value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">
                                Danh mục sản phẩm:
                            </div>
                            <div className="w-100 px-3">
                                <BaseDropdown
                                    name="categoryID"
                                    dropdownInitialValue="Chọn danh mục sản phẩm"
                                    options={categoryOptions}
                                    disabled={!editMode}
                                    value={productOnChange.category_id}
                                    onValueChanged={(value) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            category_id: value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">Giá sản phẩm: </div>
                            <div className="w-100 px-3">
                                <BaseNumberField
                                    name="ProductPrice"
                                    placeholder="Nhập giá sản phẩm..."
                                    disabled={!editMode}
                                    value={productOnChange.price}
                                    onChange={(e) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            price: e.target.value,
                                        })
                                    }
                                    error="Bạn chưa nhập giá sản phẩm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">
                                Số lượng sản phẩm:{" "}
                            </div>
                            <div className="w-100 px-3">
                                <BaseNumberField
                                    name="ProductQuantity"
                                    placeholder="Nhập số lượng sản phẩm..."
                                    disabled={!editMode}
                                    value={productOnChange.quantity}
                                    onChange={(e) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            quantity: e.target.value,
                                        })
                                    }
                                    error="Bạn chưa nhập số lượng sản phẩm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-start bg-white border-1 shadow-sm rounded w-100 py-3">
                            <div className="fs-6 ms-4 mb-2">
                                Số sản phẩm đã bán:{" "}
                            </div>
                            <div className="w-100 px-3">
                                <BaseNumberField
                                    name="ProductSell"
                                    placeholder="Nhập số sản phẩm đã bán..."
                                    disabled={!editMode}
                                    value={productOnChange.sell}
                                    onChange={(e) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            sell: e.target.value,
                                        })
                                    }
                                    error="Bạn chưa nhập số sản phẩm đã bán"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DialogModal>
    );
}

export default ModalDetailProduct;
