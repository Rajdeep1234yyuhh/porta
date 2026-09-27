import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "../../lib/admin-auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="mx-auto max-w-sm pt-10 sm:pt-20">
      <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-purple-100 text-purple-600 border border-purple-200">
        Admin
      </span>
      <h1 className="mt-4 text-2xl font-bold">Sign in</h1>
      <p className="mt-1 text-sm text-slate-600">Manage the content on rajdeepkotoky.com.</p>
      {adminConfigured() ? (
        <LoginForm />
      ) : (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Admin login isn&apos;t set up. Set <code>ADMIN_PASSWORD</code> (12+ characters) and{" "}
          <code>ADMIN_SESSION_SECRET</code> (32+ characters) in the environment, then redeploy.
        </p>
      )}
    </div>
  );
}
