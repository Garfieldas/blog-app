import api from "./api";

export const getAllAuthors = async () => {
    try {
        const response = await api.get('/authors');
        return response.data;
    }
    catch(error: any){
        return error.message;
    }
}