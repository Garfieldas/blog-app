import axios from "axios";
import { baseUrl } from "../../utils/constants";

const api = axios.create({
  baseURL: baseUrl,
});


export const getAllAuthors = async (pageNumber: number, itemsPerPage: number, query: string) => {
  try {
    const response = await api.get(`/authors?_page=${pageNumber}&_limit=${itemsPerPage}&q=${query}`);
    const fetchedAuthors = response.data;

    const totalItems = response.headers['x-total-count'];
    return {
      authors: fetchedAuthors,
      totalItems,
      status: true
    }
  }

  catch (error: any) {
    return {
      error: error.message,
      status: false
    }
  }
};
