"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { parseAsIsoDateTime, parseAsStringLiteral, useQueryStates } from "nuqs";

import DatePicker, {
  DEFAULT_DATE_RANGE_SELECTOR_PRESET,
  getFromToByPreset,
  SUPPORTED_PRESET_VALUES,
  type TDatePickerProps,
} from "@ui/components/input/date-picker";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

import {
  useBackofficeControllerGetUsersDashboard,
  type UsersDashboardResponse,
} from "@repo/services/backoffice";

import { ApiUsageCard } from "@/components/dashboard/api-usage-card";
import { CalendarConnectionCard } from "@/components/dashboard/calendar-connection-card";
import { ChatRoleChart } from "@/components/dashboard/chat-role-chart";
import {
  computeChange,
  MetricTrend,
  sumRoles,
} from "@/components/dashboard/metric-trend";
import { ProviderBreakdownCard } from "@/components/dashboard/provider-breakdown-card";
import { SignupMethodDonut } from "@/components/dashboard/signup-method-donut";
import { UsersByRoleChart } from "@/components/dashboard/users-by-role-chart";

function percentage(value: number, total: number) {
  return total > 0 ? Math.min((value / total) * 100, 100) : 0;
}

function SummaryMetric({
  label,
  value,
  detail,
  change,
}: {
  label: string;
  value: string;
  detail: string;
  change?: number;
}) {
  return (
    <Card className="gap-3 rounded-lg py-3 shadow-none">
      <CardHeader className="grid grid-cols-[1fr_auto] gap-2 px-4">
        <CardTitle className="truncate text-sm font-medium">{label}</CardTitle>
        <CardAction className="self-center">
          <MetricTrend change={change} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-3 px-4">
        <p className="text-xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        <p className="truncate text-xs text-muted-foreground contrast-more:text-foreground">
          {detail}
        </p>
      </CardContent>
    </Card>
  );
}

export function DashboardView({
  initialData,
}: {
  initialData: UsersDashboardResponse;
}) {
  const [params, setParams] = useQueryStates({
    dateFrom: parseAsIsoDateTime,
    dateTo: parseAsIsoDateTime,
    preset: parseAsStringLiteral(SUPPORTED_PRESET_VALUES),
  });

  const date = useMemo(() => {
    if (!params.dateFrom || !params.dateTo) return undefined;
    return { from: params.dateFrom, to: params.dateTo };
  }, [params.dateFrom, params.dateTo]);

  const pickerValue: TDatePickerProps["value"] = {
    date,
    preset: params.preset ?? undefined,
  };

  const { data } = useBackofficeControllerGetUsersDashboard(
    {
      queryParams: {
        dateFrom: params.dateFrom?.toISOString(),
        dateTo: params.dateTo?.toISOString(),
      },
    },
    { placeholderData: initialData },
  );

  const stats = data?.data;

  const previousRange = useMemo(() => {
    if (!params.dateFrom || !params.dateTo) return undefined;
    const from = params.dateFrom.getTime();
    const to = params.dateTo.getTime();
    const span = to - from;
    return {
      dateFrom: new Date(from - span - 1).toISOString(),
      dateTo: new Date(from - 1).toISOString(),
    };
  }, [params.dateFrom, params.dateTo]);

  const { data: previousData } = useBackofficeControllerGetUsersDashboard(
    { queryParams: previousRange },
    { enabled: Boolean(previousRange) },
  );

  const previousStats = previousData?.data;

  const totalUsers = sumRoles(stats);
  const previousUsers = sumRoles(previousStats);
  const totalMessages = stats?.totalChatMessages ?? 0;
  const previousMessages = previousStats?.totalChatMessages ?? 0;
  const conversations = stats?.totalChatConversations ?? 0;
  const previousConversations = previousStats?.totalChatConversations ?? 0;
  const userMessages = stats?.chatMessagesByRole.user ?? 0;
  const assistantMessages = stats?.chatMessagesByRole.assistant ?? 0;
  const calendarTotal =
    (stats?.googleCalendarConnected ?? 0) +
    (stats?.googleCalendarNotConnected ?? 0);
  const previousCalendarTotal =
    (previousStats?.googleCalendarConnected ?? 0) +
    (previousStats?.googleCalendarNotConnected ?? 0);
  const calendarRate = percentage(
    stats?.googleCalendarConnected ?? 0,
    calendarTotal,
  );
  const previousCalendarRate = percentage(
    previousStats?.googleCalendarConnected ?? 0,
    previousCalendarTotal,
  );
  const apiUsage = percentage(
    stats?.totalApiRequestsUsed ?? 0,
    stats?.totalApiRequestLimit ?? 0,
  );
  const previousApiUsage = percentage(
    previousStats?.totalApiRequestsUsed ?? 0,
    previousStats?.totalApiRequestLimit ?? 0,
  );

  const selectedPeriod = params.dateFrom
    ? params.dateTo
      ? `${format(params.dateFrom, "MMM d")} – ${format(params.dateTo, "MMM d, yyyy")}`
      : `From ${format(params.dateFrom, "MMM d, yyyy")}`
    : "All-time overview";

  const handleReset = () => {
    const defaultRange = getFromToByPreset(
      DEFAULT_DATE_RANGE_SELECTOR_PRESET,
      new Date(),
    );
    void setParams({
      dateFrom: defaultRange?.from ?? null,
      dateTo: defaultRange?.to ?? null,
      preset: DEFAULT_DATE_RANGE_SELECTOR_PRESET,
    });
  };

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <header className="sticky top-0 z-30 w-full shrink-0 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
            <p className="truncate text-xs text-muted-foreground contrast-more:text-foreground">
              ScheduleMate product health · {selectedPeriod}
            </p>
          </div>
          <DatePicker
            value={pickerValue}
            onChange={(next) => {
              void setParams({
                dateFrom: next.date?.from ?? null,
                dateTo: next.date?.to ?? null,
                preset: next.preset ?? null,
              });
            }}
            onFilterRemove={handleReset}
          />
        </div>
      </header>
      <div className="custom-scrollbar-thin flex w-full flex-col gap-3 overflow-auto py-4">
        <section className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <Card className="overflow-hidden rounded-lg py-0 shadow-none lg:col-span-7">
            <CardHeader className="gap-1 border-b px-4 py-3">
              <CardTitle className="text-sm">Assistant activity</CardTitle>
              <CardDescription className="contrast-more:text-foreground">
                Conversations and messages handled in this period
              </CardDescription>
              <CardAction>
                <MetricTrend
                  change={computeChange(totalMessages, previousMessages)}
                />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4 py-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground contrast-more:text-foreground">
                    Total messages
                  </p>
                  <p className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                    {totalMessages.toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground contrast-more:text-foreground">
                      Conversations
                    </p>
                    <p className="text-lg font-semibold tabular-nums">
                      {conversations.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground contrast-more:text-foreground">
                      Avg. messages
                    </p>
                    <p className="text-lg font-semibold tabular-nums">
                      {conversations > 0
                        ? (totalMessages / conversations).toFixed(1)
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div
                  className="flex h-3 w-full overflow-hidden rounded-full bg-muted"
                  role="img"
                  aria-label={`${userMessages.toLocaleString()} user messages and ${assistantMessages.toLocaleString()} assistant messages`}
                >
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${percentage(userMessages, totalMessages)}%`,
                    }}
                  />
                  <div
                    className="h-full bg-chart-2"
                    style={{
                      width: `${percentage(assistantMessages, totalMessages)}%`,
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-muted-foreground contrast-more:text-foreground">
                      <span className="size-2 rounded-full bg-primary" /> User
                    </span>
                    <span className="font-medium tabular-nums">
                      {userMessages.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-muted-foreground contrast-more:text-foreground">
                      <span className="size-2 rounded-full bg-chart-2" />{" "}
                      Assistant
                    </span>
                    <span className="font-medium tabular-nums">
                      {assistantMessages.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <SummaryMetric
              label="Registered users"
              value={totalUsers.toLocaleString()}
              detail="accounts"
              change={computeChange(totalUsers, previousUsers)}
            />
            <SummaryMetric
              label="Conversations"
              value={conversations.toLocaleString()}
              detail="chat sessions"
              change={computeChange(conversations, previousConversations)}
            />
            <SummaryMetric
              label="Calendar adoption"
              value={`${calendarRate.toFixed(1)}%`}
              detail={`${(stats?.googleCalendarConnected ?? 0).toLocaleString()} connected`}
              change={computeChange(calendarRate, previousCalendarRate)}
            />
            <SummaryMetric
              label="API utilization"
              value={`${apiUsage.toFixed(1)}%`}
              detail={`${(stats?.totalApiRequestsUsed ?? 0).toLocaleString()} requests`}
              change={computeChange(apiUsage, previousApiUsage)}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <ApiUsageCard stats={stats} className="lg:col-span-4" />
          <UsersByRoleChart stats={stats} className="lg:col-span-4" />
          <SignupMethodDonut stats={stats} className="lg:col-span-4" />
          <ChatRoleChart stats={stats} className="lg:col-span-6" />
          <CalendarConnectionCard stats={stats} className="lg:col-span-6" />
          <ProviderBreakdownCard stats={stats} className="lg:col-span-12" />
        </section>
      </div>
    </div>
  );
}
