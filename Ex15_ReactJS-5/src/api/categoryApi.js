import axiosClient from "./axiosClient";

const categoryApi = {
    
    getCategoryList: (params) => {
        const url = '/admin/categories'
        return axiosClient.get(url, {params});
    },
    
    getAllCategories: () => {
        const url = '/admin/categories/all'
        return axiosClient.get(url);
    },
    
    getCategoryDetail: (id) => {
        const url = '/admin/categories/' + id;
        return axiosClient.get(url);
    },

    createCategory: (params) => {
        const url = '/admin/categories';
        return axiosClient.post(url, params);
    },

    editCategory: (id, params) => {
        const url = '/admin/categories/' + id;
        return axiosClient.put(url, params);
    },

    deleteCategory: (id) => {
        const url = '/admin/categories/' + id;
        return axiosClient.delete(url);
    },
}

export default categoryApi;