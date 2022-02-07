import axios from "axios";

const baseUrl = "http://localhost:3000";

interface userData {
  email: string;
  password: string;
}

interface recoverData {
  email: string;
}

interface recoverPassword {
  password: string;
  passwordConfirmation: string;
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
    recoverPassword: {
      recoverPassword: (credentials: recoverPassword) =>
        axios.patch(`${baseUrl}/password`, {
          user: {
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation,
          },
        }),
    },
  };
}

export const clientApi = initClientApi();
