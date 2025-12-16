export interface Position {
  id: number;
  name: string;
  salary: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewPosition {
  name: string;
  salary: string;
}

export interface UpdatePosition {
  name: string;
  salary: string;
}
