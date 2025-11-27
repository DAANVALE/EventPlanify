export interface User {
  id: number;
  username: string;
  lastname: string;
  firstname: string;
  phone: string;
  role: 'USER' | 'HOST' | 'ADMIN'; 
}