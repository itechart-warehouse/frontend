export interface Consignment {
  id: number;
  status: string;
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;
  first_name: string;
  second_name: string;
  passport: string;
  contractor_name: string;
  truck_number: string;
  date: string;
}

export interface UserInfo {
  user: {
    first_name: string;
    last_name: string;
  };
}
