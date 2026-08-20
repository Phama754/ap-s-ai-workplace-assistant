import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

const title = "Interview Question Builder — AP's Workplace Assistant";
const description =
  "Generate role-specific interview questions with scoring guidance, probes and red flags.";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <ToolWorkspace tool={getTool("interview")} />,
});
