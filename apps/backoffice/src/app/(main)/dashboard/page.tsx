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
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to the ScheduledMate Backoffice
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <CardDescription className="text-xs">Manage users</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm">
              <Link href="/users">View Users</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">LLM Config</CardTitle>
            <CardDescription className="text-xs">
              Configure LLM providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm">
              <Link href="/llm-config">Manage LLM</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Settings</CardTitle>
            <CardDescription className="text-xs">App settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm" disabled>
              <Link href="/settings">Coming Soon</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
            <CardDescription className="text-xs">
              View analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm" disabled>
              <Link href="/analytics">Coming Soon</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Logs</CardTitle>
            <CardDescription className="text-xs">System logs</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm" disabled>
              <Link href="/logs">Coming Soon</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
