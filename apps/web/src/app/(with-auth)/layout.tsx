import { redirect } from "next/navigation";

import { getServerAuthToken } from "@/services/auth-server";

export default async function WithAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getServerAuthToken();
  if (!token) {
    redirect("/auth/login");
  }

  return children;
}
