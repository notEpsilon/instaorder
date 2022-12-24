export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  is_owner: 0 | 1;
}
