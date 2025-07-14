import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { readStorage } from "../../utils/localStorage";

const api = axios.create({
  baseURL: baseUrl,
});

export const getAllPosts = async (pageNumber: number, itemsPerPage: number, query: string) => {
  try {
    const response = await api.get(`/posts?_expand=author&_page=${pageNumber}&_limit=${itemsPerPage}&q=${query}`);
    const fetchedPosts = response.data;

    const totalItems = response.headers['x-total-count'];
    if (fetchedPosts) {
      return {
        posts: fetchedPosts,
        totalItems,
        status: true
      }
    }
  } catch (error: any) {
    return {
      error: error.message,
      status: false,
    }
  }
};


export const getSinglePost = async (id: number) => {
  try {
    const response = await api.get(`/posts/${id}?_expand=author`);
    const fetchedPost = response.data;
    if (fetchedPost) {

      return {
        post: fetchedPost,
        status: true
      }
    }
  }
  catch (error: any) {
    return {
      error: error.message,
      status: false,
    }
  }
}

export const createPost = async (title: string, authorId: number, body: string) => {
  const created_at = new Date().toISOString();
  const updated_at = new Date().toISOString();
  const post = { title, authorId, body, created_at, updated_at };
  const token = readStorage();
  try {
      await api.post('/posts', post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { status: true }
  }
  catch (error: any) {
    let errorMessage = '';

    if (error.response && error.response.status === 401) {
      errorMessage = 'Failed to authorize. Please log in again';
    }
    else {
      errorMessage = 'Network failed';
    }

    return { status: false, error: errorMessage }
  }
}