export interface User {
  id: number;
  username: string;
  hash: string;
  full_name: string;
  date_of_birth: Date;
  contact: number;
  address: string;
  role: string;
  pending_approval: boolean;
}
