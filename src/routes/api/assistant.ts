import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { callGateway } from "@/lib/ai-gateway.server";
import { buildToolPrompt, CHAT_SYSTEM_PROMPT } from "@/lib/prompts.server";

const Body = z.union([
  z.object({
    kind: z.literal("tool"),
    tool: z.enum([
      "email",
      "notes",
      "planner",
      "research",
      "helpdesk",
      "interview",
      "cv",
    ]),
    values: z.record(z.string()),
  }),
  z.object({
    kind: z.literal("chat"),
    messages: z
      .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
      .min(1)
      .max(40),
  }),
]);

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = Body.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
        try {
          const messages =
            parsed.kind === "tool"
              ? (() => {
                  const { system, prompt } = buildToolPrompt(parsed.tool, parsed.values);
                  return [
                    { role: "system" as const, content: system },
                    { role: "user" as const, content: prompt },
                  ];
                })()
              : [{ role: "system" as const, content: CHAT_SYSTEM_PROMPT }, ...parsed.messages];

          return Response.json({ text: await callGateway(messages) });
        } catch (e) {
          return Response.json(
            { error: e instanceof Error ? e.message : "AI request failed." },
            { status: 502 },
          );
        }
      },
    },
  },
});
