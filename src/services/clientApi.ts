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
  active: boolean;
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

interface userEditData {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  userRoleId: number;
}

interface warehouseFullData {
  userEmail: string;
  userPassword: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  warehouseName: string;
  warehouseAddress: string;
  warehousePhone: string;
  area: string;
}

function initClientApi() {
  return {
    userData: {
      login: (credentials: userData) =>
        axios.post(`${baseUrl}/login`, {
          user: { email: credentials.email, password: credentials.password },
        }),
      logout: (jwt: string) =>
        axios.delete(`${baseUrl}/logout`, { headers: { authorization: jwt } }),
    },
    recoverData: {
      recoverEmail: (credentials: recoverData) =>
        axios.post(`${baseUrl}/password`, {
          user: { email: credentials.email },
        }),
    },
    company: {
      create: (companyCredentials: companyFullData, jwt: string) =>
        axios.post(
          `${baseUrl}/company/create`,
          {
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
          },
          { headers: { authorization: jwt } }
        ),
      getAll: (jwt: string) =>
        axios.get(`${baseUrl}/companies`, { headers: { authorization: jwt } }),
      getById: (id: any, jwt: string) =>
        axios.get(`${baseUrl}/companies/${id}`, {
          headers: { authorization: jwt },
        }),
      editCompanyById: (
        id: any,
        companyCredentials: companyData,
        jwt: string
      ) =>
        axios.post(
          `${baseUrl}/companies/update/${id}`,
          {
            company: {
              name: companyCredentials.companyName,
              address: companyCredentials.companyAddress,
              phone: companyCredentials.companyPhone,
              email: companyCredentials.companyEmail,
              active: companyCredentials.active,
            },
          },
          { headers: { authorization: jwt } }
        ),
    },
    user: {
      create: (userCredentials: userFullData, jwt: string) =>
        axios.post(
          `${baseUrl}/user/create`,
          {
            user: {
              email: userCredentials.userEmail,
              password: userCredentials.userPassword,
              first_name: userCredentials.firstName,
              last_name: userCredentials.lastName,
              birth_date: userCredentials.birthDate,
              address: userCredentials.address,
              user_role_id: userCredentials.role_id,
            },
            company: {
              id: userCredentials.company_id,
            },
          },
          { headers: { authorization: jwt } }
        ),
      getAll: (jwt: string) =>
        axios.get(`${baseUrl}/users`, { headers: { authorization: jwt } }),
      getInfoToCreate: (jwt: string) =>
        axios.get(`${baseUrl}/user/create`, {
          headers: { authorization: jwt },
        }),
      getById: (id: any, jwt: string) =>
        axios.get(`${baseUrl}/users/${id}`, {
          headers: { authorization: jwt },
        }),
      editUserById: (id: any, credentials: userEditData, jwt: string) =>
        axios.post(
          `${baseUrl}/users/update/${id}`,
          {
            user: {
              first_name: credentials.firstName,
              last_name: credentials.lastName,
              birth_date: credentials.birthDate,
              address: credentials.address,
              user_role_id: credentials.userRoleId,
            },
          },
          { headers: { authorization: jwt } }
        ),
      getAllRoles: (jwt: string) =>
        axios.get(`${baseUrl}/roles`, { headers: { authorization: jwt } }),
    },
    warehouse: {
      getAllByCompanyId: (company_id: any, jwt: string) =>
        axios.get(`${baseUrl}/companies/${company_id}/warehouses`, {
          headers: { authorization: jwt },
        }),
      create: (warehouseCredentials: warehouseFullData, id: any, jwt: string) =>
        axios.post(`${baseUrl}/warehouse/create`, {
          warehouse: {
            area: warehouseCredentials.area,
            name: warehouseCredentials.warehouseName,
            address: warehouseCredentials.address,
            phone: warehouseCredentials.warehousePhone,
          },
          user: {
            email: warehouseCredentials.userEmail,
            password: warehouseCredentials.userPassword,
            first_name: warehouseCredentials.firstName,
            last_name: warehouseCredentials.lastName,
            birth_date: warehouseCredentials.birthDate,
            address: warehouseCredentials.address,
          },
          company: {
            id: id,
          },
          headers: { authorization: jwt },
        }),
      getById: (id: any, jwt: string) =>
        axios.get(`${baseUrl}/warehouse/${id}`, {
          headers: { authorization: jwt },
        }),
    },
  };
}

export const clientApi = initClientApi();
