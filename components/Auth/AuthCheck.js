// components/Auth/AuthCheck.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * AuthCheck component enforces Role-Based Access Control (RBAC).
 * It verifies if the user's role (from localStorage) matches the path they are trying to access.
 * Unauthorized users are redirected to their respective dashboards.
 */
export default function AuthCheck({ children } = {}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userType");
      const path = router.asPath;

      if (!role) {
        router.push("/login");
        return;
      }

      // Define restricted route prefixes
      const isAdminPath = path.startsWith('/admin');
      const isDoctorPath = path.startsWith('/doctor');
      const isPatientPath = path.startsWith('/patient');

      // Enforce Role-Based Access Control
      if (isAdminPath && role !== 'admin') {
        router.push(`/${role}/dashboard`);
      } else if (isDoctorPath && role !== 'doctor') {
        router.push(`/${role}/dashboard`);
      } else if (isPatientPath && role !== 'patient') {
        router.push(`/${role}/dashboard`);
      } else {
        setAllowed(true);
      }
    }
  }, [router]);

  if (!allowed) return null; // avoids rendering until check is done

  return <>{children}</>;
}
