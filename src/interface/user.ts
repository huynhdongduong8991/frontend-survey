export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
}

export interface IUserResetPassword {
  email: string;
  password: string;
}
