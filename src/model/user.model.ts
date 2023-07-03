export interface UserModel {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  password: string;
}

export interface UserInput {
  name: string;
  email: string;
  birthDate: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
