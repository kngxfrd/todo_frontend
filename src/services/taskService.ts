import type{ Task, TaskPayload } from "./auth"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, 
}}
async function safeJson(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function getTasks(): Promise<{ message: string; tasks: Task[] }> {
  const response = await fetch(`${BASE_URL}/tasks/`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    const error = await safeJson(response);  // 👈 safeJson instead of response.json()
    throw new Error(error.message || "failed to fetch tasks");
  }

  return safeJson(response);  // 👈 here too
}

export async function createTask(payload: TaskPayload): Promise<Task>{
  const response = await fetch(`${BASE_URL}tasks/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  })
  if (!response.ok) {
    const error = await safeJson(response);  // 👈 safeJson instead of response.json()
    throw new Error(error.message || "failed to create tasks");
  }

  return safeJson(response);  // 👈 here too 

}

export async function updateTask(id: number, payload: Partial<TaskPayload>): Promise<Task> {
  const response = await fetch(`${BASE_URL}tasks/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const error = await safeJson(response);  // 👈 safeJson instead of response.json()
    throw new Error(error.message || "failed to update tasks");
  }

  return safeJson(response);  // 👈 here too
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}tasks/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });
if (!response.ok) {
    const error = await safeJson(response);  
    throw new Error(error.message || "failed to delete tasks");
  }

  return safeJson(response);  // 👈 here too
}