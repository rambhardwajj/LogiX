export {};

declare global {
  interface User {
    id: string;
    email: string;
    fullname: string;
    avatar: string | null;
    role: "ADMIN" | "USER";
    provider: "LOCAL" | "GOOGLE";
    isVerified: boolean;
    dailyProblemStreak: number; 
    linkedInUrl: string | null,
    githubUrl: string | null,
    xUrl: string | null,
  }

  interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
  }

  interface BaseResponse {
    message: string;
    code: number;
    success: boolean;
  }

  interface ApiResponse<T> extends BaseResponse {
    data: T;
  }
}