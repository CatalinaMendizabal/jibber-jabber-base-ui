import axios from "axios";
import {User, UserData} from "../users";
import UserService from "../../utils/userService";
import _kc from "../../main/keycloak";

const userData = axios.create({
    baseURL: "http://localhost:8086/user/",
    headers: {
        "Content-type": "application/json"
    }
})

const followAxios = axios.create({
    baseURL: "http://localhost:8086/follow/",
    headers: {
        "Content-type": "application/json"
    }
})

export class UserApi implements UserData {
    getCurrentUser(): Promise<User | undefined> {
        return userData.get("").then(res => res.data)
    }

    getUserById(userId: string): Promise<User | undefined> {
        return userData.get(`/${userId}`).then(res => res.data)
    }

    isFollowed(userId: string): Promise<boolean | undefined> {
        return followAxios.get(`/isFollowed/${userId}`).then(res => res.data)
    }

    toggleFollow(userId: string): Promise<void> {
        return followAxios.post(`/${userId}`)
    }

    searchUser(userName: string): Promise<User> | undefined {
        return userData.get(`/search/${userName}`)
    }
}

userData.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
        const cb = () => {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return Promise.resolve(config);
        };
        return UserService.updateToken(cb);
    }
});

followAxios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
        const cb = () => {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return Promise.resolve(config);
        };
        return UserService.updateToken(cb);
    }
});