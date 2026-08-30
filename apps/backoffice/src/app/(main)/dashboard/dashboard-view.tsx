"use client";

import { useMemo } from "react";
import { parseAsIsoDateTime, parseAsStringLiteral, useQueryStates } from "nuqs";

import DatePicker, {
  DEFAULT_DATE_RANGE_SELECTOR_PRESET,
  getFromToByPreset,
  SUPPORTED_PRESET_VALUES,
  type TDatePickerProps,
} from "@ui/components/input/date-picker";

import {
  useBackofficeControllerGetUsersDashboard,
  type UsersDashboardResponse,
} from "@repo/services/backoffice";

import { CalendarConnectionDonut } from "@/components/dashboard/calendar-connection-donut";
import { ChatRoleDonut } from "@/components/dashboard/chat-role-donut";
import { ProviderDonut } from "@/components/dashboard/provider-donut";
import { SignupMethodDonut } from "@/components/dashboard/signup-method-donut";
import { StatCards } from "@/components/dashboard/stat-cards";
import { UsersByRoleChart } from "@/components/dashboard/users-by-role-chart";

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
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

      <StatCards stats={stats} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CalendarConnectionDonut stats={stats} />
        <SignupMethodDonut stats={stats} />
        <div className="col-span-2">
          <ProviderDonut stats={stats} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <UsersByRoleChart stats={stats} />
        <ChatRoleDonut stats={stats} />
      </div>
    </div>
  );
}
