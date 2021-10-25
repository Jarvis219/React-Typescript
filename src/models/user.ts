export interface DataUser {
  email: string;
  id: string;
  password: string;
  name: string;
  permission: number;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  permission?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface DataGoogle {
  uid: String;
  photoURL: string;
  name: string;
  email: string;
  confirmed: boolean;
}
