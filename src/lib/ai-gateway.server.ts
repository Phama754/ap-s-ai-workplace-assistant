export const CHAT_MODEL = "google/gemini-2.5-flash";

export type GatewayMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callGateway(messages: GatewayMessage[]): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured. Please try again later.");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
    },
    body: JSON.stringify({ model: CHAT_MODEL, messages, stream: false }),
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("Too many requests right now — please wait a moment and retry.");
    }
    if (res.status === 402) {
      throw new Error(
        "AI credits are exhausted for this workspace. Add credits in Lovable to continue.",
      );
    }
    if (res.status === 403) {
      throw new Error("AI access is blocked for this workspace. Contact your admin.");
    }
    const detail = await res.text().catch(() => "");
    throw new Error(`AI request failed (${res.status}). ${detail.slice(0, 200)}`);
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = json.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("The AI returned an empty response. Please try again.");
  return text;
}
