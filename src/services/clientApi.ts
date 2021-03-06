import axios from "axios";
import {
  userData,
  recoverData,
  companyFullData,
  companyData,
  userFullData,
  userEditData,
  warehouseFullData,
  warehouseEditData,
  consignmentFullData,
  goodsFullData,
  report,
} from "./clientApi.types";

const baseUrl: string = process.env.REACT_APP_WAREHOUSE_URL as string;
//TODO Test local url
// const baseUrl: string = process.env.REACT_APP_WAREHOUSE_LOCAL_URL as string;

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
            // company: {
            //   id: userCredentials.company_id,
            // },
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
              active: credentials.active,
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
        axios.post(
          `${baseUrl}/warehouse/create`,
          {
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
          },
          { headers: { authorization: jwt } }
        ),
      getById: (id: any, jwt: string) =>
        axios.get(`${baseUrl}/warehouse/${id}`, {
          headers: { authorization: jwt },
        }),
      editWarehouseById: (
        id: any,
        credentials: warehouseEditData,
        jwt: string
      ) =>
        axios.post(
          `${baseUrl}/warehouses/update/${id}`,
          {
            warehouse: {
              name: credentials.warehouseName,
              address: credentials.warehouseAddress,
              phone: credentials.warehousePhone,
              area: credentials.warehouseArea,
              active: credentials.active,
            },
          },
          { headers: { authorization: jwt } }
        ),
    },
    section: {
      getAllByWarehouseId: (warehouse_id: any, jwt: string) =>
        axios.get(`${baseUrl}/warehouses/${warehouse_id}/sections`, {
          headers: { authorization: jwt },
        }),
    },
    driver: {
      getAll: (jwt: string) =>
        axios.get(`${baseUrl}/drivers`, { headers: { authorization: jwt } }),
      getById: (id: any, jwt: string) =>
        axios.get(`${baseUrl}/drivers/${id}`, {
          headers: { authorization: jwt },
        }),
    },
    consignment: {
      create: (
        consignmentCredentials: consignmentFullData,
        goodsCredentials: goodsFullData,
        jwt: string
      ) =>
        axios.post(
          `${baseUrl}/consignments/create`,
          {
            consignment: {
              status: consignmentCredentials.status,
              bundle_seria: consignmentCredentials.bundle_seria,
              bundle_number: consignmentCredentials.bundle_number,
              consignment_seria: consignmentCredentials.consignment_seria,
              consignment_number: consignmentCredentials.consignment_number,
              truck_number: consignmentCredentials.truck.truck_number,
              first_name: consignmentCredentials.driver.first_name,
              second_name: consignmentCredentials.driver.second_name,
              passport: consignmentCredentials.driver.passport,
              contractor_name: consignmentCredentials.driver.company.name,
            },
            goods: goodsCredentials,
          },
          { headers: { authorization: jwt } }
        ),
      getById: (id: any, jwt: string) =>
        axios.get(`${baseUrl}/warehouse-consignments/${id}`, {
          headers: { authorization: jwt },
        }),
      getAll: (jwt: string) =>
        axios.get(`${baseUrl}/warehouse-consignments`, {
          headers: { authorization: jwt },
        }),
    },
    warehouseConsignment: {
      check: (id: any, jwt: string) =>
        axios.post(
          `${baseUrl}/warehouse-consignments/${id}/check`,
          {},
          { headers: { authorization: jwt } }
        ),
      place: (id: any, jwt: string) =>
        axios.post(
          `${baseUrl}/warehouse-consignments/${id}/place`,
          {},
          { headers: { authorization: jwt } }
        ),
      recheck: (id: any, jwt: string) =>
        axios.post(
          `${baseUrl}/warehouse-consignments/${id}/recheck`,
          {},
          { headers: { authorization: jwt } }
        ),
      shipp: (id: any, jwt: string) =>
        axios.post(
          `${baseUrl}/warehouse-consignments/${id}/shipp`,
          {},
          { headers: { authorization: jwt } }
        ),
    },
    goods: {
      getByConsignmentId: (id: any, jwt: string) =>
        axios.get(`${baseUrl}/warehouse-consignments/${id}/goods`, {
          headers: { authorization: jwt },
        }),
    },
    report: {
      create: (consignmentId: any, jwt: string, reportData: report) =>
        axios.post(
          `${baseUrl}/warehouse-consignments/${consignmentId}/reports/create`,
          {
            report: {
              description: reportData.description,
              report_type_id: reportData.report_type_id,
              reported: reportData.reported,
            },
          },
          {
            headers: { authorization: jwt },
          }
        ),
      getListOfTypes: (id: any, jwt: string) =>
        axios.get(`${baseUrl}/warehouse-consignments/${id}/reports/create`, {
          headers: { authorization: jwt },
        }),
      getAllByConsignmentId: (consignment_id: any, jwt: string) =>
        axios.get(
          `${baseUrl}/warehouse-consignments/${consignment_id}/reports`,
          {
            headers: { authorization: jwt },
          }
        ),
      reportedGoods: (report_id: any, jwt: string) =>
        axios.get(`${baseUrl}/reports/${report_id}/goods`, {
          headers: { authorization: jwt },
        }),
    },
  };
}
export const clientApi = initClientApi();
