export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  active: boolean;

  company: {
    name: string;
  };

  user_role: {
    name: string;
  };
}
