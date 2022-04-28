import axios from "axios";

const baseUrl: string = process.env.REACT_APP_TRUCK_URL as string;
const token: string = process.env.REACT_APP_TRUCK_TOKEN as string;

function initTruckApi() {
  return {
    driver: {
      getAll: () =>
        axios.get(`${baseUrl}/drivers.json`, {
          headers: { authorization: token },
        }),
    },
    consignment: {
      getAll: () =>
        axios.get(`${baseUrl}/consignments`, {
          headers: { authorization: token },
        }),
      getById: (id: any) =>
        axios.get(`${baseUrl}/consignments/${id}`, {
          headers: { authorization: token },
        }),
    },
    transports: {
      getAll: () =>
        axios.get(`${baseUrl}/trucks.json`, {
          headers: { authorization: token },
        }),
    },
    goods: {
      getByConsignmentId: (id: any) =>
        axios.get(`${baseUrl}/consignments/${id}/consignment_goods`, {
          headers: { authorization: token },
        }),
    },
  };
}

export const truckApi = initTruckApi();
