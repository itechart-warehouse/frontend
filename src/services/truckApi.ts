import axios from "axios";

const baseUrl = " https://trucking-logistics.herokuapp.com/api/v1";
const token = "Basic c3lzYWRtaW5AZXhhbXBsZS5jb206c3lzYWRtaW4xMjM=";

function initTruckApi() {
  return {
    driver: {
      getAll: () =>
        axios.get(`${baseUrl}/drivers.json`, {
          headers: { authorization: token },
        }),
    },
    transports: {
      getAll: () =>
        axios.get(`${baseUrl}/trucks.json`, {
          headers: { authorization: token },
        }),
    },
  };
}

export const truckApi = initTruckApi();
