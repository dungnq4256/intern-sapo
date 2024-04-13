import { AuthContext } from "AuthContext";
import categoryApi from "api/categoryApi";
import inventoryApi from "api/inventoryApi";
import productApi from "api/productApi";
import BaseDropdown from "general/components/BaseForm/BaseDropdown";
import BaseNumberField from "general/components/BaseForm/BaseNumberField";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

ModalCreateProduct.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.bool,
    updateData: PropTypes.func,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
};
ModalCreateProduct.defaultProps = {
    show: null,
    close: true,
    updateData: null,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
    title: "",
};

function ModalCreateProduct(props) {
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
    const { categoryOptions, inventoryOptions } = useContext(AuthContext);
    const [productOnChange, setProductOnChange] = useState({
        category_id: null,
        inventory_id: null,
        name: "",
        code: "",
        description: "",
        image: "",
        price: "",
        quantity: "",
        sell: "",
    });
    const resetText = () => {
        setProductOnChange({
            category_id: null,
            inventory_id: null,
            name: "",
            code: "",
            description: "",
            image: "",
            price: "",
            quantity: "",
            sell: "",
        });
    };

    const handleClose = () => {
        resetText();
        if (onClose) {
            onClose();
        }
    };

    const handelCreateProduct = async () => {
        if (
            productOnChange.code === "" ||
            productOnChange.name === "" ||
            productOnChange.description === "" ||
            productOnChange.category_id === "" ||
            productOnChange.inventory_id === "" ||
            productOnChange.image === "" ||
            productOnChange.price === "" ||
            productOnChange.quantity === "" ||
            productOnChange.sell === ""
        ) {
            ToastHelper.showError("Vui lòng nhập đủ các trường dữ liệu!");
            return;
        }
        const res = await productApi.createProduct(productOnChange);
        if (res.status === 200)
            ToastHelper.showSuccess("Thêm sản phẩm thành công!");
        updateData(true);
        resetText();
    };

    return (
        <DialogModal
            show={show}
            onClose={handleClose}
            icon={icon}
            size="lg"
            description={description}
            onExecute={handelCreateProduct}
            title="Thêm sản phẩm"
            textBtnCancel="Hủy"
            textBtnExecute="Xác nhận"
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
                            <div className="fs-6 ms-4 mb-2">Kho sản phẩm: </div>
                            <div className="w-100 px-3">
                                <BaseDropdown
                                    name="inventoryID"
                                    options={inventoryOptions}
                                    dropdownInitialValue="Chọn kho sản phẩm"
                                    value={productOnChange.inventory_id}
                                    onValueChanged={(value) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            inventory_id: value,
                                        })
                                    }
                                    error="Bạn chưa nhập mô tả sản phẩm"
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
                                    value={productOnChange.category_id}
                                    onValueChanged={(value) =>
                                        setProductOnChange({
                                            ...productOnChange,
                                            category_id: value,
                                        })
                                    }
                                    error="Bạn chưa nhập mô tả sản phẩm"
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
                                    min={0}
                                    placeholder="Nhập giá sản phẩm..."
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
                                    min={0}
                                    placeholder="Nhập số lượng sản phẩm..."
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
                                    min={0}
                                    placeholder="Nhập số sản phẩm đã bán..."
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

export default ModalCreateProduct;
