// components/Auth/AuthCheck.js
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@lib/context";

export default function AuthCheck({ children } = {}) {
  const router = useRouter();
  const { userRole, isUserLoading } = useContext(UserContext);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      // Priority: Context role -> LocalStorage fallback
      const role = userRole || (typeof window !== "undefined" ? localStorage.getItem("userType") : null);
      const path = router.pathname;

      if (!role) {
        router.push("/login");
        return;
      }

      // Security: Validate role-based access for protected route prefixes
      const isAuthorized =
        (path.startsWith('/admin') && role === 'admin') ||
        (path.startsWith('/doctor') && role === 'doctor') ||
        (path.startsWith('/patient') && role === 'patient') ||
        (!path.startsWith('/admin') && !path.startsWith('/doctor') && !path.startsWith('/patient'));

      if (!isAuthorized) {
        // Redirect unauthorized users to their respective legitimate dashboards
        const dashboardPath = role === 'admin' || role === 'doctor' || role === 'patient'
          ? `/${role}/dashboard`
          : '/login';
        router.push(dashboardPath);
        return;
      }

      setAllowed(true);
    }
  }, [userRole, isUserLoading, router]);

  if (!allowed || isUserLoading) return null; // avoids rendering until check is done

  return <>{children}</>;
}
