import axios from "axios";
import {FullPost, NewPost, Post, PostData} from "../posts";
import UserService from "../../utils/userService";

const jjAxios = axios.create({
    baseURL: "http://localhost:8086/post",
    headers: {
        crossDomain: true,
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

export class PostApi implements PostData {

    answerPost(postId: string, answer: NewPost): Promise<FullPost> {
        return jjAxios.post<NewPost, FullPost>(`/${postId}/reply`, answer);
    }

    createPost(post: NewPost): Promise<Post> {
        return jjAxios.post<NewPost, Post>("/", post);
    }

    getFeedPosts(): Promise<Post[]> {
        console.log("getFeedPosts");
        console.log(UserService.getToken());
        return jjAxios.get("").then(response => response.data);
    }

    getFullPostById(id: string): Promise<FullPost | undefined> {
        console.log("getFullPostById");
        return jjAxios.get(`/${id}`).then(response => response.data);
    }

}

export const deletePost = async (id: string): Promise<void> => {
    return await jjAxios.delete(`/${id}`);
}

export const getPostsByUser = async (userId: string): Promise<Post[]> => {
    return await jjAxios.get(`/user/${userId}`);
}

jjAxios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
        const cb = () => {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return Promise.resolve(config);
        };
        return UserService.updateToken(cb);
    }
});