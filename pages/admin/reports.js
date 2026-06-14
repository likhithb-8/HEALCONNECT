import AdminSidebar from "@components/Sidebar/AdminSidebar";
import AuthCheck from "@components/Auth/AuthCheck";

export default function Reports(Component , pageProps) {
  return (
    <AuthCheck requiredRole="admin">
    <AdminSidebar>
      <div className='flex h-full flex-col justify-center items-center'>
      <h1 className='text-5xl text-center prose dark:prose-invert mb-5 font-bold'>Reports</h1>
      <span className='text-7xl'>📄</span>
    </div>
    </AdminSidebar>
    </AuthCheck>
  );
}