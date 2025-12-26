export interface User {
  id: number;
  full_name: string;
  cpf: string;
  phone: string;
  email: string;
  username: string;
  role: string;
  position_id: number;
  department_id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  department: {
    id: number;
    name: string;
  };
  position: {
    id: number;
    name: string;
  };
}

export type UserStatus = "active" | "inactive";
export type UserRole = "user" | "admin";

export interface NewUser {
  full_name: string;
  cpf: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  position_id: number;
  department_id: number;
  status: UserStatus;
}
