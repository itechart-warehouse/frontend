export interface Warehouse {
  id: number;
  name: string;
  address: string;
  phone: string;
  area: string;
  active: boolean;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
export interface Company {
  name: string;
}
