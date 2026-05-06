export interface User {
  _id: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  email: string;
  password: string;
}
