"use client";

import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Separator } from "@ui/components/ui/separator";

import AuthStatus from "@/components/auth/auth-status";
import { GoogleCalendarConnect } from "@/components/google/google-calendar-connect";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const user = useAuth();
  console.log("user", user);
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="absolute top-4 right-4">
        <AuthStatus />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ScheduledMate</CardTitle>
          <CardDescription>Web application</CardDescription>
          {user?.user?.email}hu
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button>Get Started</Button>
          <Separator />
          <GoogleCalendarConnect />
        </CardContent>
      </Card>
    </main>
  );
}
