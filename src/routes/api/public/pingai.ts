import { createFileRoute } from "@tanstack/react-router";
import { callGateway } from "@/lib/ai-gateway.server";

export const Route = createFileRoute("/api/public/pingai")({
  server: {
    handlers: {
      GET: async () => {
        const t0 = Date.now();
        try {
          const ext = await fetch("https://example.com").then((r) => r.status);
          const text = await callGateway([{ role: "user", content: "say hi" }]);
          return Response.json({ ext, text, ms: Date.now() - t0 });
        } catch (e) {
          return Response.json({ error: String(e), ms: Date.now() - t0 }, { status: 500 });
        }
      },
    },
  },
});
