import axios from "axios";

const baseUrl = 'http://localhost:3000';

interface userData {
    email: string,
    password: string
}

function initClientApi() {
    return {
        userData: {
            login: (credentials: userData) => axios.post(`${baseUrl}/login`, {user:{email: credentials.email, password: credentials.password}}),
        }
    }
}

export const clientApi = initClientApi();