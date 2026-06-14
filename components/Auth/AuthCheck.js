// components/Auth/AuthCheck.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Component to check if user is authenticated and optionally has the required role.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.requiredRole] - Optional role required to access the children.
 */
export default function AuthCheck({ children, requiredRole } = {}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userType");

      if (!role) {
        router.push("/login");
      } else if (requiredRole && role !== requiredRole) {
        // Redirect to their own dashboard if role doesn't match
        // This avoids a loop if /login redirects back to the dashboard
        router.push(`/${role}/dashboard`);
      } else {
        setAllowed(true);
      }
    }
  }, [router, requiredRole]);

  if (!allowed) return null; // avoids rendering until check is done

  return <>{children}</>;
}
