// components/Auth/AuthCheck.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthCheck({ children, requiredRole } = {}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userType");
      setUserRole(role);

      if (!role) {
        router.push("/login");
      } else if (requiredRole && role !== requiredRole) {
        // Role doesn't match, we stay on page but show unauthorized UI
        setAllowed(false);
      } else {
        setAllowed(true);
      }
    }
  }, [router, requiredRole]);

  const SignOutNow = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
    router.push("/login");
  };

  if (userRole && requiredRole && userRole !== requiredRole) {
    return (
      <div style={{
        padding: "4rem 2rem",
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "12px",
        margin: "2rem auto",
        maxWidth: "600px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ fontSize: "2rem", color: "#ef4444", marginBottom: "1rem" }}>Access Denied</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: 0.8 }}>
          You do not have the required permissions to access this page.
          Required: <strong style={{ textTransform: "capitalize" }}>{requiredRole}</strong>
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              background: "#3b82f6",
              color: "white",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Go to Home
          </button>
          <button
            onClick={SignOutNow}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "transparent",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (!allowed) return null; // avoids rendering until check is done

  return <>{children}</>;
}
