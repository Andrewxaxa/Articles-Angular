export interface IUser {
  username: string;
  email: string;
  uid: string;
}

export interface ISignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
