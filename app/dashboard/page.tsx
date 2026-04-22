import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Role-based redirect hub.
 * After login, all users land on /dashboard.
 * This server component reads the session role and redirects
 * to the appropriate sub-dashboard.
 */
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const role = session.user.role;

  if (role === "ADMIN")    redirect("/dashboard/admin");
  if (role === "MARKETER") redirect("/dashboard/marketer");

  // Default: CLIENT
  redirect("/dashboard/client");
}
