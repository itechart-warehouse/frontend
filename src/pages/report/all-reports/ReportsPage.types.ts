export interface Report {
  id: string;
  report_date: string;
  description: string;

  report_type: {
    name: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  consignment: {
    consignment_seria: string;
    consignment_number: string;
  };
}
