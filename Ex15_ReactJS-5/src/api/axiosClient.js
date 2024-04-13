import axios from "axios";
import PreferenceKeys from "general/constants/PreferenceKeys";
import UserHelper from "general/helpers/UserHelper";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem(PreferenceKeys.accessToken);
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        console.log(error);
        let errorMessage = null;
        const originalRequest = error.config;
        const response = error.response;
        if (response && (response.status === 403 || response.status === 401)) {
            return refreshToken().then(() => {
                return axiosClient(originalRequest);
            });
        }
        if (errorMessage) {
            console.error(errorMessage);
        }
        throw error;
    }
);

// Update base url
const updateAxiosBaseURL = (baseUrl) => {
    axiosClient.defaults.baseURL = baseUrl;
};

// Update access token
const updateAxiosAccessToken = (accessToken) => {
    axiosClient.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${accessToken}`;
};

// Remove access token
const removeAxiosAccessToken = () => {
    delete axiosClient.defaults.headers.common["Authorization"];
};

const refreshToken = async () => {
    if (UserHelper.checkToken() && !UserHelper.checkRefreshTokenExpired()) {
        if (!UserHelper.checkAccessTokenExpired()) {
            const token = localStorage.getItem(PreferenceKeys.accessToken);
            updateAxiosAccessToken(token);
        } else {
            const refreshToken = localStorage.getItem(
                PreferenceKeys.refreshToken
            );
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
                {},
                {
                    headers: {
                        RefreshToken: `Bearer ${refreshToken}`,
                    },
                }
            );
            console.log(response);
            localStorage.setItem(
                PreferenceKeys.accessToken,
                response.data.access_token
            );
            updateAxiosAccessToken(response.data.access_token);
        }
        // axiosClient(originalRequest);
    } else {
        UserHelper.signOut();
        removeAxiosAccessToken();
    }
};

export { updateAxiosAccessToken, removeAxiosAccessToken, updateAxiosBaseURL };

export default axiosClient;
