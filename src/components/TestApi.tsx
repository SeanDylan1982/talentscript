import React, { useState } from "react";
import { register, login, saveResume, fetchResume } from "../api/userApi";
import initialResumeData from "@/contexts/ResumeData";

export default function TestApi() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("test123");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<any>(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>API Test</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <div>
        <button
          onClick={async () => setResult(await register(email, password))}
        >
          Register
        </button>
        <button
          onClick={async () => {
            const res = await login(email, password);
            setResult(res);
            if (res.token) setToken(res.token);
          }}
        >
          Login
        </button>
        <button
          onClick={async () =>
            setResult(await saveResume(token, initialResumeData))
          }
          disabled={!token}
        >
          Save Resume
        </button>
        <button
          onClick={async () => setResult(await fetchResume(token))}
          disabled={!token}
        >
          Fetch Resume
        </button>
      </div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
