export interface User {
    id: string;
    email: string;
    pseudo: string;
    roles: "user" | "admin";
  }
  
  export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  export interface RegisterFormData {
    email: string;
    password: string;
    pseudo: string;
  }