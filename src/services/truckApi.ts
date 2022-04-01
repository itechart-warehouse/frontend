import axios from "axios";

const baseUrl = " https://trucking-logistics.herokuapp.com/api/v1";
const token = "Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz";

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
