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
