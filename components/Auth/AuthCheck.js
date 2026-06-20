// components/Auth/AuthCheck.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default function AuthCheck({ children, requiredRole }) {
  const router = useRouter();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userType");
      if (!role) {
        router.replace("/login");
      } else if (requiredRole && (Array.isArray(requiredRole) ? !requiredRole.includes(role) : role !== requiredRole)) {
        setStatus("unauthorized");
      } else {
        setStatus("authorized");
      }
    }
  }, [router, requiredRole]);

  if (status === "loading") return null;

  if (status === "unauthorized") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 text-center border border-red-100 dark:border-red-900/30">
          <FaLock className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You do not have the required permissions to view this page.</p>
          <Link href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
