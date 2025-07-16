import { axiosInstance } from "./axiosService";
import { readStorage } from "../utils/localStorage";

export const getPosts = async(params?:string) => {
    try {
        const url = params ? `/posts${params}` : '/posts';
        const response = await axiosInstance.get(url);
        const posts = response.data;
        const totalItems = response.headers['x-total-count'];
        return { posts, totalItems};
    }
    catch(error: any){
        throw error;
    }
}

export const createPost = async (title: string, authorId: number, body: string, created_at: string, updated_at: string) => {
  const post = { title, authorId, body, created_at, updated_at };
  const token = readStorage();
  try {
      await axiosInstance.post('/posts', post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { status: true }
  }
  catch (error: any) {
    throw error;
  }
}

export const editPost = async (id: number, title: string, authorId: number, body: string, updated_at: string) => {
  const post = { id, title, authorId, body, updated_at };
  const token = readStorage();
  try {
      await axiosInstance.patch(`/posts/${id}`, post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { status: true }
  }
  catch (error: any) {
    throw error;
  }
}

export const deletePost = async (id: number) => {
  const token = readStorage();
  try {
      await axiosInstance.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { status: true }
  }
  catch (error: any) {
    throw error;
  }
}