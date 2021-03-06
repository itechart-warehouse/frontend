export interface userData {
  email: string;
  password: string;
}

export interface recoverData {
  email: string;
}

export interface companyFullData {
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
export interface companyData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  active: boolean;
}

export interface userFullData {
  userEmail: string;
  userPassword: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  company_id: string;
  role_id: string;
}

export interface userEditData {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  userRoleId: number;
  active: boolean;
}

export interface warehouseFullData {
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
  active: boolean;
}

export interface warehouseEditData {
  warehouseName: string;
  warehouseAddress: string;
  warehousePhone: string;
  warehouseArea: string;
  active: boolean;
}

export interface consignmentFullData {
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

export interface goodsFullData {
  good_status: string;
  good_name: string;
  quantity: number;
}

export interface report {
  description: string;
  report_type_id: string;
  reported: { id: number; name: string; quantity: string }[];
}
