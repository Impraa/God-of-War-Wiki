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
  id: number | string;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  favouritePosts: Post[];
}

export interface Post {
  id: number;
  name: string;
  description: string;
  type: "Greek mythos" | "Nordic mythos";
  postImages: [{ id: number; postImage: string }];
}

export interface Comment {
  id: number;
  text: string;
  owner: User;
}

export interface Options {
  sort?: "ASC" | "DESC";
  searchQuery?: string;
  filter?: "greekMythos" | "nordicMythos";
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
  errors: string[];
}

export interface UserAPIResponse {
  message: string;
  error?: string;
  user?: User;
}

export interface PostState {
  posts: Post[];
  post: Post | null;
  isLoading: boolean;
  errors: string[];
}

export interface PostAPIResponse {
  message: string;
  error?: string;
  posts?: Post[];
  post?: Post;
}

export interface CommentState {
  comments: Comment[];
  isLoading: boolean;
  errors: string[];
}

export interface CommentAPIREsponse {
  message: string;
  error?: string;
  comments?: Comment[];
}
