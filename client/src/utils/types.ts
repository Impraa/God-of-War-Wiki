export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  email: string;
  confirmPassword: string;
}
