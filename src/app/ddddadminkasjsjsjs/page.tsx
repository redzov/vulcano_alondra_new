"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          router.replace("/ddddadminkasjsjsjs/services");
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.replace("/ddddadminkasjsjsjs/services");
      } else {
        setError(data.error || "Invalid credentials");
        setLoading(false);
      }
    } catch {
      setError("Connection error");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={styles.logoCircle}>TE</div>
          <h1 style={styles.title}>Teide Explorer</h1>
          <p style={styles.subtitle}>Admin Panel</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              autoComplete="username"
              required
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
    padding: 16,
  },
  card: {
    background: "white",
    borderRadius: 16,
    padding: 40,
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: "#E74D0F",
    color: "white",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1a1a1a",
    margin: "0 0 4px",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    margin: 0,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "12px 0",
    borderRadius: 10,
    border: "none",
    background: "#E74D0F",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  error: {
    color: "#dc2626",
    fontSize: 13,
    marginBottom: 16,
    textAlign: "center",
  },
};
