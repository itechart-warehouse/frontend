export interface Role {
  id: number;
  name: string;
  manage_all: boolean;
  manage_all_users: boolean;
  manage_all_warehouses: boolean;
  manage_all_companys: boolean;
  manage_all_consigments: boolean;
  manage_all_roles: boolean;
  read_all: boolean;
  read_all_user: boolean;
  read_all_warehouse: boolean;
  read_all_company: boolean;
  read_all_consigment: boolean;
  read_all_roles: boolean;
  manage_your_company_user: boolean;
  manage_your_company_warehouses: boolean;
  manage_your_company: boolean;
  manage_your_warehouse: boolean;
  manage_your_company_consigment: boolean;
  manage_your_company_roles: boolean;
  read_your_company_user: boolean;
  read_your_company_warehouse: boolean;
  read_your_company_consigment: boolean;
  reg_consigment: boolean;
  check_consigment: boolean;
  place_consigment: boolean;
}
