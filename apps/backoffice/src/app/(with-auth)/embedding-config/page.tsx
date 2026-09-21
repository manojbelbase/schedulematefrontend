import type { Metadata } from "next";

import { withDefaultPagination } from "@ui/lib/pagination";
import type { TQueryParams } from "@ui/types/globals";

import { fetchEmbeddingConfigControllerListConfigs } from "@repo/services/backoffice";

import { EmbeddingConfigTable } from "@/components/pages/embedding-config/table";

export const metadata: Metadata = { title: "Embedding Config" };

export default async function EmbeddingConfigPage(props: TQueryParams) {
  const searchParams = await props.searchParams;
  const initialData = await fetchEmbeddingConfigControllerListConfigs({
    queryParams: withDefaultPagination(searchParams),
  });

  return (
    <EmbeddingConfigTable
      searchParams={searchParams}
      initialData={initialData}
    />
  );
}
