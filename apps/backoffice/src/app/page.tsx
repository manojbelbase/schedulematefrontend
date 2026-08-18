import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ScheduledMate Backoffice</CardTitle>
          <CardDescription>Admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Manage</Button>
        </CardContent>
      </Card>
    </main>
  );
}