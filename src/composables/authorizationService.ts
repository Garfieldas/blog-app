import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useAuthenticationStore } from "@/stores/authenticationStore";

const api = axios.create({
    baseURL: baseUrl
})

export const getToken = async (email: string, password: string) => {
    const credentials = { email, password }
    const authorize = useAuthenticationStore();
    try {
        const response = await api.post('/login', credentials);
        const user = response.data.user;
        const token = response.data.accessToken;
        if (token) {
            authorize.Login(token, user);
            return {
                status: true
            }
        }
    }
    catch (error: any) {
        return {
            status: false,
            error: error.message
        }
    }
}