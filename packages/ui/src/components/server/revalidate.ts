"use server";

import { revalidatePath } from "next/cache";

export default async function action(path: string, type?: "page" | "layout") {
  revalidatePath(path, type || "page");
}
