export type ChatMessage = { role: "user" | "assistant"; content: string };

type Payload =
  | { kind: "tool"; tool: string; values: Record<string, string> }
  | { kind: "chat"; messages: ChatMessage[] };

export async function askAssistant(payload: Payload): Promise<string> {
  const res = await fetch("/api/assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json().catch(() => ({}))) as { text?: string; error?: string };
  if (!res.ok || !json.text) throw new Error(json.error ?? "The assistant is unavailable.");
  return json.text;
}
