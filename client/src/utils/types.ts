export interface LoginUser {
  username: string;
  password: string;
  isChecked: boolean;
}

export interface RegisterUser {
  email: string;
  confirmPassword: string;
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
}

//Redux types

export interface UserState {
  user: User;
  isLoading: boolean;
  error: string;
}

export interface UserAPIResponse {
  message: string;
  error?: string;
  user?: User;
}
