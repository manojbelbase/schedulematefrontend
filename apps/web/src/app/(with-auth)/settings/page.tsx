"use client";

import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

import AuthStatus from "@/components/auth/auth-status";
import { GoogleCalendarConnect } from "@/components/google/google-calendar-connect";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="absolute top-4 right-4">
        <AuthStatus />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Suspense>
            <GoogleCalendarConnect />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
