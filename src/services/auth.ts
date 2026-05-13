export interface RegisterPayload {
 name: string;
 username: string;
 email: string;
 password: string;
}

export interface LoginPayload {
 username: string,
 email: string,
 password: string;
}

export interface AuthResponse {
 token: string;
 user: {
 id: number;
 name: string;
 email: string;
 };
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: number;
}

export interface TaskPayload {
  title: string;
  description: string;
  completed?: boolean;
  created_at: number;
}
