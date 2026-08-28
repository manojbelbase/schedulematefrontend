import type { Metadata } from "next";

import { fetchLlmConfigControllerListConfigs } from "@repo/services/backoffice";

import { LlmConfigTable } from "./table";

export const metadata: Metadata = { title: "LLM Config" };

export default async function LlmConfigPage() {
  const initialData = await fetchLlmConfigControllerListConfigs({});

  return <LlmConfigTable initialData={initialData} />;
}
