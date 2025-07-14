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

export const getUnPaginatedAuthors = async () => {
  try {
    const response = await api.get('/authors/');
    const authors = response.data;

    return {
      authors,
      status: true
    }
  }

  catch (error: any) {
    return {
      error: error.message,
      status: false
    }
  }
}

export const createAuthor = async (name: string, surname: string, created_at: string, updated_at: string) => {
  const author = { name, surname, created_at, updated_at };
  const token = readStorage();
  try {
      await api.post('/authors', author, {
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

export const editAuthor = async (id: number, name: string, surname: string, updated_at: string) => {
  const author = { name, surname, updated_at }
  const token = readStorage();
  try {
      await api.patch(`/authors/${id}`, author, {
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

export const deleteAuthor = async (id: number) => {
  const token = readStorage();
  try {
      await api.delete(`/authors/${id}?_embed=posts`, {
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