import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

const title = "Meeting Notes Summarizer — AP's Workplace Assistant";
const description =
  "Turn raw meeting notes into summaries, decisions and owner-tagged action items.";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <ToolWorkspace tool={getTool("notes")} />,
});
