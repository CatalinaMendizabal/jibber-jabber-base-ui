import axios from "axios";
import UserService from "./userService";

const Methods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
};

const _axios = axios.create();

const configure = () => {
    _axios.interceptors.request.use((config) => {
        if (UserService.isLoggedIn()) {
            console.log(UserService.getToken());
            const cb = () => {
                // @ts-ignore
                config.headers.Authorization = `Bearer ${UserService.getToken()}`;
                return Promise.resolve(config);
            };
            return UserService.updateToken(cb);
        }
    });
};

const getAxiosClient = () => _axios;

const Service = {
    Methods,
    configure,
    getAxiosClient,
};

export default Service;