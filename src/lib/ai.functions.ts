import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { streamText } from "ai";
import { createLovableAiGatewayProvider, CHAT_MODEL } from "./ai-gateway.server";
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
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured (missing key).");
    const { system, prompt } = buildToolPrompt(data.tool, data.values);
    const result = streamText({
      model: createLovableAiGatewayProvider(key)(CHAT_MODEL),
      system,
      prompt,
    });
    return { text: await result.text };
  });

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured (missing key).");
    const result = streamText({
      model: createLovableAiGatewayProvider(key)(CHAT_MODEL),
      system: CHAT_SYSTEM_PROMPT,
      messages: data.messages,
    });
    return { text: await result.text };
  });
