// components/Auth/AuthCheck.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthCheck({ children, requiredRole } = {}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userType");

      if (!role) {
        router.replace("/login");
      } else if (requiredRole && role !== requiredRole) {
        // Redirect unauthorized users to their own dashboard if they don't have the required role
        router.replace(`/${role}/dashboard`);
      } else {
        setAllowed(true);
      }
    }
  }, [router, requiredRole]);

  if (!allowed) return null; // avoids rendering until check is done

  return <>{children}</>;
}
