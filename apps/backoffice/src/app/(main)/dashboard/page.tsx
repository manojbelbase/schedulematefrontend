import Link from "next/link";

import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the ScheduledMate Backoffice
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage users</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/users">View Users</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>App settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" disabled>
              <Link href="/settings">Coming Soon</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>View analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" disabled>
              <Link href="/analytics">Coming Soon</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logs</CardTitle>
            <CardDescription>System logs</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" disabled>
              <Link href="/logs">Coming Soon</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
