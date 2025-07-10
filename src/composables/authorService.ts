import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { readStorage } from "../../utils/localStorage";

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

export const createAuthor = async (name: string, surname: string) => {
  const created_at = new Date().toISOString();
  const updated_at = new Date().toISOString();
  const author = { name, surname, created_at, updated_at };
  const token = readStorage();
  try {
    const response = await api.post('/authors', author, {
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
