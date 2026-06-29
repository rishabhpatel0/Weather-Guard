const API = "https://://weather-guard-1.onrender.com/users";

export async function getUsers() {
  const response = await fetch(API);
  return response.json();
}

export async function approveUser(id: string) {
  await fetch(`${API}/${id}/approve`, {
    method: "PATCH",
  });
}