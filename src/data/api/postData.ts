import axios from "axios";
import {FullPost, NewPost, Post, PostData} from "../posts";

const jjAxios = axios.create({
    baseURL: "http://localhost:8080/post",
    headers: {
        "Authorization": "Bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFOUZNNlM3cmZwa1lvQnlteFdyWnp3RWFnQjk4TGJDWnRHTW56RmVxVFFnIn0.eyJleHAiOjE2NTQ0Njc4MjMsImlhdCI6MTY1NDQ2NzUyMywiYXV0aF90aW1lIjoxNjU0NDY1OTQ4LCJqdGkiOiIzMzZiMDhjNS1lNzI1LTQ5ZDYtOTI3Yy1mNTlkOGMxNTcyYTUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODAvcmVhbG1zL0ppYmJlci1KYWJiZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMzFmMjRmYzctZTVhNS00ZDNjLTk3MjAtYmY3NWNlMzlkNzBmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiamliYmVyLWphYmJlci1wb3N0Iiwic2Vzc2lvbl9zdGF0ZSI6ImZjZTVkZDFiLWQ3MWQtNDdhYS1hZjYyLTg1YjE5NTc5YTQwZSIsImFjciI6IjAiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiamotYWRtaW4iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1qaWJiZXItamFiYmVyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZmNlNWRkMWItZDcxZC00N2FhLWFmNjItODViMTk1NzlhNDBlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiTmljb2zDoXMgV2VybmVyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibmljbyIsImdpdmVuX25hbWUiOiJOaWNvbMOhcyIsImZhbWlseV9uYW1lIjoiV2VybmVyIiwiZW1haWwiOiJuaWNvbGFzLndlcm5lckBpbmcuYXVzdHJhbC5lZHUuYXIifQ.jJrBiTmQlSHGNh3CtBPimVhgfMXJUJfAC5Y76e8poubyIde4JOjNNw9tIhiXRZdNRNMREx73NV7_xXrQMsKWgeqsEMfOT1rT7Xxs8RbzSzmhV6SkTSAhqIPneaeXMIAOFP6xiv-Cy_VpCe4DdlpinWIlWCQyyDsNCz6aXc-bGmo5Ro59U2op4btjc-hKl24l9EL2Qu9_iRipaiDqDSKfhfkOZEFMyMWYCJztJ2kGYKLoZryfYKxSgGeDhpHCu0epdvFUSgnbr8y7lUkIwZf0yHznSmEs8H5GG5h9Z9Ij8ARgXJt2aZ71FkGeLYG19jXVjQS3GezPi_HDPamQbS38ow",
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
        return jjAxios.get("/");
    }

    getFullPostById(id: string): Promise<FullPost | undefined> {
        return jjAxios.get(`/${id}`);
    }

}

export const deletePost = async (id: string): Promise<void> => {
    return await jjAxios.delete(`/${id}`);
}

export const getPostsByUser = async (userId: string): Promise<Post[]> => {
    return await jjAxios.get(`/user/${userId}`);
}