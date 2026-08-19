import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { callGateway } from "./ai-gateway.server";
import { buildToolPrompt, CHAT_SYSTEM_PROMPT } from "./prompts.server";

const ToolInput = z.object({
  tool: z.enum(["email", "notes", "planner", "research"]),
  values: z.record(z.string()),
});

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

export const runAssistantTool = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ToolInput.parse(input))
  .handler(async ({ data }) => {
    const { system, prompt } = buildToolPrompt(data.tool, data.values);
    const text = await callGateway([
      { role: "system", content: system },
      { role: "user", content: prompt },
    ]);
    return { text };
  });

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const text = await callGateway([
      { role: "system", content: CHAT_SYSTEM_PROMPT },
      ...data.messages,
    ]);
    return { text };
  });
