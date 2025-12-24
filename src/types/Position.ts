export interface Position {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewPosition {
  name: string;
}

export interface UpdatePosition {
  name: string;
}
