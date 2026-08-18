import { Button } from "@ui/components/ui/button";
import { Badge } from "@ui/components/ui/badge";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <Badge variant="default">ScheduledMate</Badge>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        Book appointments, manage schedules, and stay organized.
      </h1>
      <p className="max-w-xl text-muted-foreground">
        The easiest way to manage your schedules, appointments, and bookings.
      </p>
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </main>
  );
}