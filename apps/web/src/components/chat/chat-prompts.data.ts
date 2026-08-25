import type { ChatPrompt } from "@/types/chat";

export const CHAT_PROMPTS: ChatPrompt[] = [
  {
    title: "What's on today?",
    description: "Show me my meetings for today.",
  },
  {
    title: "Schedule a meeting",
    description: "Create a 1-hour meeting tomorrow at 4 PM.",
  },
  {
    title: "Reschedule",
    description: "Move my next meeting to 5 PM.",
  },
  {
    title: "Find a free slot",
    description: "When am I free to take a 30-min meeting?",
  },
];
