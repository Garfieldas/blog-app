import api from "./api";
import { getErrorMessage } from "./errorService";

export const getAllAuthors = async () => {
    try {
        const response = await api.get('/authors');
        return response.data;
    }
    catch(error: any){
        throw new Error(getErrorMessage(error));
    }
}