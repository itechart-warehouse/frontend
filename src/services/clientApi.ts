import axios from "axios";

const baseUrl = "http://localhost:3000";

interface userData {
  email: string;
  password: string;
}

interface recoverData {
  email: string;
}

interface companyFullData {
  userEmail: string;
  userPassword: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
}
interface companyData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
}

interface userFullData {
  userEmail: string;
  userPassword: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  company_id: string;
  role_id: string;
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
      create: (companyCredentials: companyFullData) =>
        axios.post(`${baseUrl}/company/create`, {
          company: {
            email: companyCredentials.companyEmail,
            name: companyCredentials.companyName,
            address: companyCredentials.address,
            phone: companyCredentials.companyPhone,
          },
          user: {
            email: companyCredentials.userEmail,
            password: companyCredentials.userPassword,
            first_name: companyCredentials.firstName,
            last_name: companyCredentials.lastName,
            birth_date: companyCredentials.birthDate,
            address: companyCredentials.address,
          },
        }),
      getAll: () => axios.get(`${baseUrl}/companies`),
      getById: (id: any) => axios.get(`${baseUrl}/companies/${id}`),
      editCompanyById: (id: any, companyCredentials: companyData) =>
        axios.post(`${baseUrl}/companies/update/${id}`, {
          company: {
            name: companyCredentials.companyName,
            address: companyCredentials.companyAddress,
            phone: companyCredentials.companyPhone,
            email: companyCredentials.companyEmail,
          },
        }),
    },
    user: {
      create: (userCredentials: userFullData) =>
        axios.post(`${baseUrl}/user/create`, {
          user: {
            email: userCredentials.userEmail,
            password: userCredentials.userPassword,
            first_name: userCredentials.firstName,
            last_name: userCredentials.lastName,
            birth_date: userCredentials.birthDate,
            address: userCredentials.address,
            role_id: userCredentials.role_id,
          },
          company: {
            id: userCredentials.company_id
          },
        }),
      getAll: () => axios.get(`${baseUrl}/users`),
      getInfoToCreate: () => axios.get(`${baseUrl}/user/create`),
    },
  };
}

export const clientApi = initClientApi();
