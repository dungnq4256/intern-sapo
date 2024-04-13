import categoryApi from "api/categoryApi";
import BaseLayout from "general/components/BaseLayout";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap/Table";
import "./style.scss";
import AppButton from "general/components/AppButton";
import Pagination from "general/components/Pagination";
import BaseSearchBar from "general/components/BaseForm/BaseSearchBar";
import ModalDetailCategory from "./ModalDetailCategory";
import DialogModal from "general/components/DialogModal";
import ModalCreateCategory from "./ModalCreateCategory";
import ToastHelper from "general/helpers/ToastHelper";

function CategoryListScreen(props) {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [showModalCreateCategory, setShowModalCreateCategory] =
        useState(false);
    const [showModalDetailCategory, setShowModalDetailCategory] =
        useState(false);
    const [showModalDeleteCategory, setShowModalDeleteCategory] =
        useState(false);
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
            const res = await categoryApi.getCategoryList(filters);
            if (res) {
                setCategoryList(res);
            }
        }
        fetchData();
        setIsUpdated(false);
    }, [filters, isUpdated == true]);

    const handleDeleteCategory = async () => {
        const res = await categoryApi.deleteCategory(selectedCategory?.id);
        if (res.status === 200) {
            ToastHelper.showSuccess("Xóa danh mục thành công!");
            setIsUpdated(true);
        }
    };

    return (
        <BaseLayout selected="category">
            <div className="CategoryList d-flex flex-column">
                <div className="list-group my-2 w-100">
                    <div className="list-header d-flex justify-content-between align-items-center rounded-top w-100">
                        <div className="d-flex flex-column">
                            <h3>Danh sách danh mục</h3>
                            <span>
                                Tổng số: {categoryList?.totalElements} danh mục
                            </span>
                        </div>
                        <div className="w-50 pe-3 pe-lg-0">
                            <BaseSearchBar
                                placeholder="Tìm kiếm danh mục"
                                value={filters.name}
                                name="categoryFilter"
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
                                    setShowModalCreateCategory(true);
                                }}
                            />
                        </div>
                    </div>
                    <div className="list-body rounded-bottom">
                        <BootstrapTable striped bordered hover>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã danh mục</th>
                                    <th>Tên danh mục</th>
                                    <th>Mô tả danh mục</th>
                                    <th>Xem</th>
                                    <th>Thực hiện</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList?.content?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {categoryList?.number *
                                                categoryList?.size +
                                                index +
                                                1}
                                        </td>
                                        <td>{item?.code}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.description}</td>
                                        <td>
                                            <AppButton
                                                // text="Xem"
                                                beforIcon={
                                                    <i className="fa-regular fa-eye"></i>
                                                }
                                                className="btn-blue px-3 py-2"
                                                fontSize="0.8rem"
                                                onClick={() => {
                                                    setSelectedCategory(item);
                                                    setShowModalDetailCategory(
                                                        true
                                                    );
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <AppButton
                                                    // text="Sửa"
                                                    beforIcon={
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    }
                                                    className="btn-green px-3 py-2 me-3"
                                                    fontSize="0.9rem"
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setSelectedCategory(
                                                            item
                                                        );
                                                        setShowModalDetailCategory(
                                                            true
                                                        );
                                                    }}
                                                />
                                                <AppButton
                                                    // text="Xóa"
                                                    beforIcon={
                                                        <i className="fa-regular fa-trash-can"></i>
                                                    }
                                                    className="btn-danger px-3 py-2"
                                                    fontSize="0.9rem"
                                                    onClick={() => {
                                                        setSelectedCategory(
                                                            item
                                                        );
                                                        setShowModalDeleteCategory(
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
                        size={categoryList?.size}
                        currentPage={categoryList?.number + 1 ?? 1}
                        totalPages={categoryList?.totalPages}
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
            <ModalCreateCategory
                show={showModalCreateCategory}
                updateData={updateData}
                onClose={() => setShowModalCreateCategory(false)}
            />
            <ModalDetailCategory
                updateData={updateData}
                isEditMode={editMode}
                categoryInfo={selectedCategory}
                show={showModalDetailCategory}
                onExecute={() => setEditMode(!editMode)}
                onClose={() => {
                    setShowModalDetailCategory(false);
                    setEditMode(false);
                }}
            />
            <DialogModal
                show={showModalDeleteCategory}
                onClose={() => setShowModalDeleteCategory(false)}
                title="Xóa danh mục"
                icon="fa-regular fa-trash-can text-primary"
                description={`Bạn có chắc chắn muốn xóa danh mục ${selectedCategory.name}?`}
                onExecute={handleDeleteCategory}
                textBtnCancel="Hủy"
                textBtnExecute="Xác nhận"
            />
        </BaseLayout>
    );
}

CategoryListScreen.propTypes = {};

export default CategoryListScreen;
