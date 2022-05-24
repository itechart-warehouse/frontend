export interface User {
  first_name: string;
  last_name: string;
  birth_date: string;
  address: string;
  email: string;

  company: {
    name: string;
  };

  user_role: {
    name: string;
  };
}
