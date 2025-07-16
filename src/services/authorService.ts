import { axiosInstance } from "./axiosService";
import { readStorage } from "../utils/localStorage";


export const getAuthors = async(params?:string) => {
    try {
        const url = params ? `/authors${params}` : '/authors';
        const response = await axiosInstance.get(url);
        const authors = response.data;
        const totalItems = response.headers['x-total-count'];
        return { authors, totalItems};
    }
    catch(error: any){
        throw error;
    }
}

export const createAuthor = async (name: string, surname: string, created_at: string, updated_at: string) => {
  const author = { name, surname, created_at, updated_at };
  const token = readStorage();
  try {
      await axiosInstance.post('/authors', author, {
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

export const editAuthor = async (id: number, name: string, surname: string, updated_at: string) => {
  const author = { name, surname, updated_at }
  const token = readStorage();
  try {
      await axiosInstance.patch(`/authors/${id}`, author, {
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

export const deleteAuthor = async (id: number) => {
  const token = readStorage();
  try {
      await axiosInstance.delete(`/authors/${id}?_embed=posts`, {
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