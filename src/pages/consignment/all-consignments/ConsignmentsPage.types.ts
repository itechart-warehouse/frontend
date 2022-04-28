export interface ConsignmentsType {
  id: number;
  status: string;
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;
  truck: {
    truck_number: string;
    truck_type: {
      truck_type_name: string;
    };
  };
  driver: {
    first_name: string;
    second_name: string;
    middle_name: string;
    birthday: string;
    passport: string;
    role: {
      role_name: string;
    };
    company: {
      name: string;
    };
  };
}
