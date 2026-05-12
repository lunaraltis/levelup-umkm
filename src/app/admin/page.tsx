import AdminEditor from "@/components/AdminEditor";
import AdminLoginForm from "@/components/AdminLoginForm";
import { isAdminAuthConfigured, isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPage() {
  const isConfigured = isAdminAuthConfigured();
  const isAuthenticated = isConfigured ? await isAdminAuthenticated() : false;

  if (!isAuthenticated) {
    return <AdminLoginForm isConfigured={isConfigured} />;
  }

  return <AdminEditor />;
}
