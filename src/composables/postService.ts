import axios from "axios";
import { baseUrl } from "../../utils/constants";

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