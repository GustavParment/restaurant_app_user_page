export interface AuthResponse {
    accessToken: string;
    user: { id: string; username: string };
  }
  
  export interface ErrorResponse {
    message: string;
    code: string;
  }