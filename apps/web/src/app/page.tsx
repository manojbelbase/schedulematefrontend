import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

import AuthStatus from "@/components/auth/auth-status";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="absolute top-4 right-4">
        <AuthStatus />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ScheduledMate</CardTitle>
          <CardDescription>Web application</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </main>
  );
}
