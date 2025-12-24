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
