// components/Auth/AuthCheck.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Component to protect routes based on authentication and role.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Children to render if authorized.
 * @param {string} [props.requiredRole] - The role required to access this route (e.g., 'admin', 'doctor', 'patient').
 */
export default function AuthCheck({ children, requiredRole } = {}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userType");

      if (!role) {
        // Not logged in, redirect to login page
        router.replace("/login");
      } else if (requiredRole && role !== requiredRole) {
        // Logged in but doesn't have the required role
        // Redirect to their respective dashboard
        router.replace(`/${role}/dashboard`);
      } else {
        // Authorized
        setAllowed(true);
      }
    }
  }, [router, requiredRole]);

  if (!allowed) return null; // avoids rendering until check is done

  return <>{children}</>;
}
