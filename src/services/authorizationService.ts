import { axiosInstance } from "./axiosService";
import { useAuthenticationStore } from "@/stores/authenticationStore";

export const getToken = async (email: string, password: string) => {
    const credentials = { email, password }
    const authorize = useAuthenticationStore();
    try {
        const response = await axiosInstance.post('/login', credentials);
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
    throw error;
    }
}