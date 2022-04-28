export interface Warehouse {
  warehouse: {
    name: string;
    address: string;
    phone: string;
    area: string;
    reserved: string;
  };
  company: {
    id: any;
    name: string;
  };
  user: {
    first_name: string;
    last_name: string;
    id: string;
  };
}
