import type{ Task, TaskPayload } from "./auth"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
}}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${BASE_URL}tasks/`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch tasks");
  const data = await response.json();
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function createTask(payload: TaskPayload): Promise<Task>{
  const response = await fetch(`${BASE_URL}tasks/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  })
  if(!response.ok) throw new Error ("Failed to create task"); 
  return response.json();  

}

export async function updateTask(id: number, payload: Partial<TaskPayload>): Promise<Task> {
  const response = await fetch(`${BASE_URL}tasks/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}tasks/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete task");
}