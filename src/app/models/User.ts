export interface User {
  id: number;
  username: string;
  password: string;
  authdata?: string;
  role?: string
}
