import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

const title = "IT & HR Helpdesk — AP's Workplace Assistant";
const description =
  "Triage employee support tickets and get a diagnosis, fix steps and a ready-to-send reply.";

export const Route = createFileRoute("/helpdesk")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <ToolWorkspace tool={getTool("helpdesk")} />,
});
