import type { Position } from "./Position";

export interface Department {
  id: number;
  name: string;
  position_id: number;
  position: Position
  createdAt: string;
  updatedAt: string;
}

export interface NewDepartment {
  name: string;
  position_id: number;
}

export interface UpdateDepartment {
  name: string;
  position_id: number;
}
