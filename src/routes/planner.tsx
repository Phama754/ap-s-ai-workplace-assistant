import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

const title = "AI Task Planner — Workplace AI";
const description =
  "Break goals into prioritised, time-boxed task plans with dependencies and milestones.";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <ToolWorkspace tool={getTool("planner")} />,
});
