const API_URL = "http://localhost:5000/api";

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function saveResume(token: string, resumeData: any) {
  const res = await fetch(`${API_URL}/resume/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ resumeData }),
  });
  return res.json();
}

export async function fetchResume(token: string) {
  const res = await fetch(`${API_URL}/resume/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
