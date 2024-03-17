export interface LoginUser {
  username: string;
  password: string;
  rememberMe: boolean;
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

export interface Post {
  name: string;
  description: string;
  type: "Greek mythos" | "Nordic mythos";
  post_image: string[];
}

//Redux types

export interface ErrorAPI {
  message: string;
  errors: string[];
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  wasTokenChecked: boolean;
  lastChecked: Date | null;
  error: ErrorAPI;
}

export interface UserAPIResponse {
  message: string;
  error?: string;
  user?: User;
}

export interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: ErrorAPI;
}

export interface PostAPIResponse {
  message: string;
  error?: string;
  posts?: Post[];
}
