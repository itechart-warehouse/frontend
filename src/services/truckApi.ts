import axios from "axios";
import { errorData } from "./clientApi.types";
import { store } from "../store";
import { setError } from "../store/errorSlice";

const baseUrl: string = process.env.REACT_APP_TRUCK_URL as string;
const token: string = process.env.REACT_APP_TRUCK_TOKEN as string;

function errorHandler(err: errorData) {
  if (err.response) {
    err.response.status === 500 || err.response.status === 401
      ? store.dispatch(setError([err.response.statusText]))
      : store.dispatch(setError(["Invalid Data"]));
  } else if (err.request) {
    store.dispatch(setError(["Server is not working"]));
    console.log("request", err.request);
  } else {
    store.dispatch(setError([err.message]));
    console.log("message", err.message);
  }
  return Promise.reject(err);
}

function initTruckApi() {
  return {
    driver: {
      getAll: () =>
        axios
          .get(`${baseUrl}/drivers.json`, {
            headers: { authorization: token },
          })
          .catch((err) => errorHandler(err)),
    },
    consignment: {
      getAll: () =>
        axios
          .get(`${baseUrl}/consignments`, {
            headers: { authorization: token },
          })
          .catch((err) => errorHandler(err)),
      getById: (id: any) =>
        axios
          .get(`${baseUrl}/consignments/${id}`, {
            headers: { authorization: token },
          })
          .catch((err) => errorHandler(err)),
    },
    transports: {
      getAll: () =>
        axios
          .get(`${baseUrl}/trucks.json`, {
            headers: { authorization: token },
          })
          .catch((err) => errorHandler(err)),
    },
    goods: {
      getByConsignmentId: (id: any) =>
        axios
          .get(`${baseUrl}/consignments/${id}/consignment_goods`, {
            headers: { authorization: token },
          })
          .catch((err) => errorHandler(err)),
    },
  };
}

export const truckApi = initTruckApi();
