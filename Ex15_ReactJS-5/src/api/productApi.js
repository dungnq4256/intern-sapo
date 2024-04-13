import axiosClient from "./axiosClient";

const productApi = {

    getProductList: (params) => {
        const url = '/admin/products'
        return axiosClient.get(url, {params});
    },

    getProductDetail: (id) => {
        const url = '/admin/products/' + id;
        return axiosClient.get(url);
    },

    createProduct: (params) => {
        const url = '/admin/products';
        return axiosClient.post(url, params);
    },

    editProduct: (id, params) => {
        const url = '/admin/products/' + id;
        return axiosClient.put(url, params);
    },

    deleteProduct: (id) => {
        const url = '/admin/products/' + id;
        return axiosClient.delete(url);
    },
}

export default productApi;