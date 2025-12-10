export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  full_name: string;
  department_id: number;
  department: {
    id: number;
    name: string;
  };
  position_id: number;
}
