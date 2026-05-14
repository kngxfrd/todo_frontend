import type { RegisterPayload, LoginPayload, AuthResponse } from "./auth"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function safeJson(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await safeJson(response);
    throw new Error(error.message || "Registration failed");
  }

  return safeJson(response);  // 👈 here too
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await safeJson(response);  // 👈 here too

    if (error.detail) throw new Error(error.detail);

    const firstKey = Object.keys(error)[0];
    if (firstKey) throw new Error(`${error[firstKey][0]}`);

    throw new Error("Login failed");
  }

  const data = await safeJson(response);
console.log("data on render:", JSON.stringify(data));

if (!data?.tokens?.access) {
  throw new Error("No token in response — possible CORS issue");
}

localStorage.setItem("token", data.tokens.access);
localStorage.setItem("refresh", data.tokens.refresh);
return data;
}