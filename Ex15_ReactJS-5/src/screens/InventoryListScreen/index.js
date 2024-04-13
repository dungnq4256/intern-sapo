import inventoryApi from "api/inventoryApi";
import BaseLayout from "general/components/BaseLayout";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap/Table";
import "./style.scss";
import AppButton from "general/components/AppButton";
import Pagination from "general/components/Pagination";
import BaseSearchBar from "general/components/BaseForm/BaseSearchBar";
import ToastHelper from "general/helpers/ToastHelper";
import DialogModal from "general/components/DialogModal";
import ModalDetailInventory from "./ModalDetailInventory";
import ModalCreateInventory from "./ModalCreateInventory";

function InventoryListScreen(props) {
    const [inventoryList, setInventoryList] = useState([]);
    const [selectedInventory, setSelectedInventory] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [showModalCreateInventory, setShowModalCreateInventory] =
        useState(false);
    const [showModalDetailInventory, setShowModalDetailInventory] =
        useState(false);
    const [showModalDeleteInventory, setShowModalDeleteInventory] =
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
            const res = await inventoryApi.getInventoryList(filters);
            if (res) {
                setInventoryList(res);
            }
        }
        fetchData();
        setIsUpdated(false);
    }, [filters, isUpdated == true]);

    const handleDeleteInventory = async () => {
        const res = await inventoryApi.deleteInventory(selectedInventory?.id);
        if (res.status === 200) {
            ToastHelper.showSuccess("Xóa kho thành công!");
            setIsUpdated(true);
        }
    };
    return (
        <BaseLayout selected="inventory">
            <div className="InventoryList d-flex flex-column">
                <div className="list-group my-2 w-100">
                    <div className="list-header d-flex justify-content-between align-items-center rounded-top w-100">
                        <div className="d-flex flex-column">
                            <h3>Danh sách kho</h3>
                            <span>
                                Tổng số: {inventoryList?.totalElements} kho
                            </span>
                        </div>
                        <div className="w-50">
                            <BaseSearchBar
                                placeholder="Tìm kiếm kho"
                                value={filters.name}
                                name="InventoryFilter"
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
                                text="Thêm kho"
                                className="btn-blue px-3 py-2"
                                fontSize="0.8rem"
                                onClick={() => {
                                    setShowModalCreateInventory(true);
                                }}
                            />
                        </div>
                    </div>
                    <div className="list-body rounded-bottom">
                        <BootstrapTable striped bordered hover>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã kho</th>
                                    <th>Tên kho</th>
                                    <th>Địa chỉ kho</th>
                                    <th>Xem</th>
                                    <th>Thực hiện</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryList?.content?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {inventoryList?.number *
                                                inventoryList?.size +
                                                index +
                                                1}
                                        </td>
                                        <td>{item?.code}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.address}</td>
                                        <td>
                                            <AppButton
                                                beforIcon={
                                                    <i className="fa-regular fa-eye"></i>
                                                }
                                                className="btn-blue px-3 py-2"
                                                fontSize="0.8rem"
                                                onClick={() => {
                                                    setSelectedInventory(item);
                                                    setShowModalDetailInventory(
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
                                                        setSelectedInventory(
                                                            item
                                                        );
                                                        setShowModalDetailInventory(
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
                                                        setSelectedInventory(
                                                            item
                                                        );
                                                        setShowModalDeleteInventory(
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
                        size={inventoryList?.size}
                        currentPage={inventoryList?.number + 1 ?? 1}
                        totalPages={inventoryList?.totalPages}
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
            <ModalCreateInventory
                show={showModalCreateInventory}
                updateData={updateData}
                onClose={() => setShowModalCreateInventory(false)}
            />
            <ModalDetailInventory
                updateData={updateData}
                isEditMode={editMode}
                inventoryInfo={selectedInventory}
                show={showModalDetailInventory}
                onExecute={() => setEditMode(!editMode)}
                onClose={() => {
                    setShowModalDetailInventory(false);
                    setEditMode(false);
                }}
            />
            <DialogModal
                show={showModalDeleteInventory}
                onClose={() => setShowModalDeleteInventory(false)}
                title="Xóa kho"
                icon="fa-regular fa-trash-can text-primary"
                description={`Bạn có chắc chắn muốn xóa kho ${selectedInventory.name}?`}
                onExecute={handleDeleteInventory}
                textBtnCancel="Hủy"
                textBtnExecute="Xác nhận"
            />
        </BaseLayout>
    );
}

InventoryListScreen.propTypes = {};

export default InventoryListScreen;
