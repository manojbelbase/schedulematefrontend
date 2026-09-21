import type { Metadata } from "next";

import { withDefaultPagination } from "@ui/lib/pagination";
import type { TQueryParams } from "@ui/types/globals";

import { fetchLlmConfigControllerListConfigs } from "@repo/services/backoffice";

import { LlmConfigTable } from "@/components/pages/llm-config/table";

export const metadata: Metadata = { title: "LLM Config" };

export default async function LlmConfigPage(props: TQueryParams) {
  const searchParams = await props.searchParams;
  const initialData = await fetchLlmConfigControllerListConfigs({
    queryParams: withDefaultPagination(searchParams),
  });

  return (
    <LlmConfigTable searchParams={searchParams} initialData={initialData} />
  );
}
