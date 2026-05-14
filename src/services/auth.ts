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

export type AuthResponse = {
  message: string;
  user: {
    name: string;
    username: string;
    email: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
};

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
}

export interface TaskPayload {
  title: string;
  description: string;
  completed?: boolean;
}
