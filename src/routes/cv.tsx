import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

const title = "CV & Resume Builder — AP's Workplace Assistant";
const description =
  "Turn your experience into a polished, ATS-friendly CV tailored to the role you want.";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <ToolWorkspace tool={getTool("cv")} />,
});
