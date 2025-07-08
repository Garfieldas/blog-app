import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore('auth', {
    state: () => ({
        isLoggedIn:
        !! localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user') || 'null')
    }),
    actions: {
        Login(token: string, user: any) {
            this.isLoggedIn = true;
            this.user = user
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user))
        },
        Logout() {
            this.isLoggedIn = false;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
})