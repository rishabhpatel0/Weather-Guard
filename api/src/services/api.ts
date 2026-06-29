const API = "http://localhost:3000";

export async function getProfile() {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/auth/profile`, {

        headers: {

            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}