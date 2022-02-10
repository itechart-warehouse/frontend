import axios from "axios";

const baseUrl = "http://localhost:3000";

interface userData {
  email: string;
  password: string;
}

interface recoverData {
  email: string;
}

function initClientApi() {
  return {
    userData: {
      login: (credentials: userData) =>
        axios.post(`${baseUrl}/login`, {
          user: { email: credentials.email, password: credentials.password },
        }),
      logout: (key: string) =>
        axios.delete(`${baseUrl}/logout`, { headers: { authorization: key } }),
    },
    recoverData: {
      recoverEmail: (credentials: recoverData) =>
        axios.post(`${baseUrl}/password`, {
          user: { email: credentials.email },
        }),
    },
    company: {
      getAll: () =>
        axios.get(`${baseUrl}/companies`)
    }
  };
}

export const clientApi = initClientApi();
