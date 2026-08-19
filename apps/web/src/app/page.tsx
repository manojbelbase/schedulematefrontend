"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ChatClient from "@/components/chat/chat-client";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <ChatClient />;
}
