import type { RegisterPayload, LoginPayload, AuthResponse } from "./auth"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
 const response = await fetch(`${BASE_URL}auth/register/`, {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify(payload),
 });

 if (!response.ok) {
 const error = await response.json();
 throw new Error(error.message || "Registration failed");
 }

 return response.json() as Promise<AuthResponse>;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse>{
  const response = await fetch(`${BASE_URL}auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
   if (!response.ok) {
 const error = await response.json();
if (error.detail) {
      throw new Error(error.detail);
    }

    const firstKey = Object.keys(error)[0];
    if (firstKey) {
      throw new Error(` ${error[firstKey][0]}`);
    }

    throw new Error("Login failed");
  }

 const data: AuthResponse = await response.json();
 localStorage.setItem("token", data.token);
 return data;
}





