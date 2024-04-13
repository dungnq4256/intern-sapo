import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
// import { removeAxiosAccessToken } from "api/axiosClient";
import PreferenceKeys from "general/constants/PreferenceKeys";

const UserHelper = {
    // Check token
    checkToken: () => {
        const accessToken = localStorage.getItem(PreferenceKeys.accessToken);
        const refreshToken = localStorage.getItem(PreferenceKeys.refreshToken);
        if (accessToken && refreshToken) {
            return true;
        }
        return false;
    },
    // Check access token expired
    checkAccessTokenExpired: () => {
        const accessToken = localStorage.getItem(PreferenceKeys.accessToken);
        const user = jwtDecode(accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        return isExpired;
    },

    // Check refresh token expired
    checkRefreshTokenExpired: () => {
        const refreshToken = localStorage.getItem(PreferenceKeys.refreshToken);
        const user = jwtDecode(refreshToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        return isExpired;
    },

    // Get username from access token
    getUsername: () => {
        const accessToken = localStorage.getItem(PreferenceKeys.accessToken);
        if (accessToken === null) return null;
        else {
            const user = jwtDecode(accessToken);
            const username = user?.sub;
            return username;
        }
    },

    // Sign out
    signOut: () => {
        localStorage.removeItem(PreferenceKeys.accessToken);
        localStorage.removeItem(PreferenceKeys.refreshToken);
        // removeAxiosAccessToken();
    },
};

export default UserHelper;
