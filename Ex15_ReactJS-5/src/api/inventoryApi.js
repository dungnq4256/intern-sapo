import axiosClient from "./axiosClient";

const inventoryApi = {

    getInventoryList: (params) => {
        const url = '/admin/inventories'
        return axiosClient.get(url, {params});
    },

    getAllInventories: () => {
        const url = '/admin/inventories/all'
        return axiosClient.get(url);
    },

    getInventoryDetail: (id) => {
        const url = '/admin/inventories/' + id;
        return axiosClient.get(url);
    },

    createInventory: (params) => {
        const url = '/admin/inventories';
        return axiosClient.post(url, params);
    },

    editInventory: (id, params) => {
        const url = '/admin/inventories/' + id;
        return axiosClient.put(url, params);
    },

    deleteInventory: (id) => {
        const url = '/admin/inventories/' + id;
        return axiosClient.delete(url);
    },
}

export default inventoryApi;