import authApi from "api/authApi";
import {
    removeAxiosAccessToken,
    updateAxiosAccessToken,
} from "api/axiosClient";
import categoryApi from "api/categoryApi";
import inventoryApi from "api/inventoryApi";
import PreferenceKeys from "general/constants/PreferenceKeys";
import ToastHelper from "general/helpers/ToastHelper";
import UserHelper from "general/helpers/UserHelper";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [inventoryOptions, setInventoryOptions] = useState([]);

    useEffect(() => {
        setLoggedIn(
            UserHelper.checkToken() && !UserHelper.checkRefreshTokenExpired()
        );
        setUser(UserHelper.getUsername());
        return () => {};
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res_category = await categoryApi.getAllCategories();
            const res_inventory = await inventoryApi.getAllInventories();
            let arr_category = [];
            let arr_inventory = [];
            for (let i = 0; i < res_category?.length; i++) {
                arr_category.push({
                    value: res_category[i].id,
                    text: res_category[i].code + " - " + res_category[i].name,
                });
            }
            for (let i = 0; i < res_inventory?.length; i++) {
                arr_inventory.push({
                    value: res_inventory[i].id,
                    text: res_inventory[i].code + " - " + res_inventory[i].name,
                });
            }
            setCategoryOptions(arr_category);
            setInventoryOptions(arr_inventory);
        };
        fetchData();

        return () => {};
    }, []);

    const login = (username, password) => {
        try {
            const fetchData = async () => {
                const response = await authApi.signIn({
                    username: username,
                    password: password,
                });
                updateAxiosAccessToken(response.access_token);
                localStorage.setItem(
                    PreferenceKeys.accessToken,
                    response.access_token
                );
                localStorage.setItem(
                    PreferenceKeys.refreshToken,
                    response.refresh_token
                );
                setLoggedIn(true);
            };
            fetchData();
        } catch (error) {
            ToastHelper.showError("Tài khoản hoặc mật khẩu không chính xác");
        }
    };

    const logout = () => {
        UserHelper.signOut();
        setLoggedIn(false);
        removeAxiosAccessToken();
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                categoryOptions,
                inventoryOptions,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
