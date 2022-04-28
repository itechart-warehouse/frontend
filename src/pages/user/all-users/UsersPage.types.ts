export interface User {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    active: boolean;
  };

  company: {
    name: string;
  };

  role: string;
}
