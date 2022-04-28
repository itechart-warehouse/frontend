export interface User {
  user: {
    first_name: string;
    last_name: string;
    birth_date: string;
    address: string;
    email: string;
  };
  company: {
    name: string;
  };
  role: {
    name: string;
  };
}
