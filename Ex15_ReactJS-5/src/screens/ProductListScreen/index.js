import productApi from "api/productApi";
import BaseLayout from "general/components/BaseLayout";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap/Table";
import "./style.scss";
import AppButton from "general/components/AppButton";
import Pagination from "general/components/Pagination";
import BaseSearchBar from "general/components/BaseForm/BaseSearchBar";
import ToastHelper from "general/helpers/ToastHelper";
import DialogModal from "general/components/DialogModal";
import ModalDetailProduct from "./ModalDetailProduct";
import ModalCreateProduct from "./ModalCreateProduct";

function ProductListScreen(props) {
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalDetailProduct, setShowModalDetailProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
    const [filters, setFilters] = useState({
        name: "",
        page: 0,
        size: 5,
    });
    const updateData = (isUpdated) => {
        setIsUpdated(isUpdated);
    };
    useEffect(() => {
        async function fetchData() {
            const res = await productApi.getProductList(filters);
            if (res) {
                setProductList(res);
            }
        }
        fetchData();
        setIsUpdated(false);
    }, [filters, isUpdated == true]);

    const handleDeleteProduct = async () => {
        const res = await productApi.deleteProduct(selectedProduct?.id);
        if (res.status === 200) {
            ToastHelper.showSuccess("Xóa sản phẩm thành công!");
            setIsUpdated(true);
        }
    };

    return (
        <BaseLayout selected="product">
            <div className="ProductList d-flex flex-column">
                <div className="list-group my-2 w-100">
                    <div className="list-header d-flex justify-content-between align-items-center rounded-top w-100">
                        <div className="d-flex flex-column">
                            <h3>Danh sách sản phẩm</h3>
                            <span>
                                Tổng số: {productList?.totalElements} sản phẩm
                            </span>
                        </div>
                        <div className="w-50">
                            <BaseSearchBar
                                placeholder="Tìm kiếm sản phẩm"
                                value={filters.name}
                                name="productFilter"
                                onSubmit={(value) => {
                                    setFilters({
                                        ...filters,
                                        name: value,
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <AppButton
                                text="Thêm"
                                className="btn-blue px-3 py-2"
                                fontSize="0.8rem"
                                onClick={() => {
                                    setShowModalCreateProduct(true);
                                }}
                            />
                        </div>
                    </div>
                    <div className="list-body rounded-bottom">
                        <BootstrapTable striped bordered hover>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Mô tả sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Đã bán</th>
                                    <th>Xem</th>
                                    <th>Thực hiện</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList?.content?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {productList?.number *
                                                productList?.size +
                                                index +
                                                1}
                                        </td>
                                        <td>{item?.code}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.description}</td>
                                        <td>{item?.price}</td>
                                        <td>{item?.quantity}</td>
                                        <td>{item?.sell}</td>
                                        <td>
                                            <AppButton
                                                beforIcon={
                                                    <i className="fa-regular fa-eye"></i>
                                                }
                                                className="btn-blue px-3 py-2"
                                                fontSize="0.8rem"
                                                onClick={() => {
                                                    setSelectedProduct(item);
                                                    setShowModalDetailProduct(
                                                        true
                                                    );
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <AppButton
                                                    beforIcon={
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    }
                                                    className="btn-green px-3 py-2 me-3"
                                                    fontSize="0.9rem"
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setSelectedProduct(
                                                            item
                                                        );
                                                        setShowModalDetailProduct(
                                                            true
                                                        );
                                                    }}
                                                />
                                                <AppButton
                                                    beforIcon={
                                                        <i className="fa-regular fa-trash-can"></i>
                                                    }
                                                    className="btn-danger px-3 py-2"
                                                    fontSize="0.9rem"
                                                    onClick={() => {
                                                        setSelectedProduct(
                                                            item
                                                        );
                                                        setShowModalDeleteProduct(
                                                            true
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </BootstrapTable>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center mt-0">
                    <Pagination
                        size={productList?.size}
                        currentPage={productList?.number + 1 ?? 1}
                        totalPages={productList?.totalPages}
                        onChangePage={(newPage) => {
                            setFilters({
                                ...filters,
                                page: newPage - 1,
                            });
                        }}
                        onChangeSize={(newSize) => {
                            setFilters({
                                ...filters,
                                page: 0,
                                size: newSize,
                            });
                        }}
                    />
                </div>
            </div>
            <ModalCreateProduct
                show={showModalCreateProduct}
                updateData={updateData}
                onClose={() => setShowModalCreateProduct(false)}
            />
            <ModalDetailProduct
                updateData={updateData}
                isEditMode={editMode}
                productInfo={selectedProduct}
                show={showModalDetailProduct}
                onExecute={() => setEditMode(!editMode)}
                onClose={() => {
                    setShowModalDetailProduct(false);
                    setEditMode(false);
                }}
            />
            <DialogModal
                show={showModalDeleteProduct}
                onClose={() => setShowModalDeleteProduct(false)}
                title="Xóa sản phẩm"
                icon="fa-regular fa-trash-can text-primary"
                description={`Bạn có chắc chắn muốn xóa sản phẩm ${selectedProduct.name}?`}
                onExecute={handleDeleteProduct}
                textBtnCancel="Hủy"
                textBtnExecute="Xác nhận"
            />
        </BaseLayout>
    );
}

ProductListScreen.propTypes = {};

export default ProductListScreen;
