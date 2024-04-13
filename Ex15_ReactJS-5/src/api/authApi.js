import axiosClient from "./axiosClient";

const authApi = {
    signIn: (params) => {
        const url = '/auth/login';
        return axiosClient.post(url, params);        
    },
    signUp: (params) => {
        const url = '/auth/sign-up';
        return axiosClient.post(url, params);        
    },
    signOut: () => {
        const url = 'auth/sign-out';
        return axiosClient.post(url);
    }
}

export default authApi;