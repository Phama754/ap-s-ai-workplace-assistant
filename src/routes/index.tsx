import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { TOOLS } from "@/lib/tools";
import { Disclaimer } from "@/components/Disclaimer";

const title = "AP's Workplace Assistant";
const description =
  "Automate workplace tasks with AI: draft emails, summarize meetings, plan work, research topics and chat with an assistant.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "AI workspaces", value: "8" },
  { label: "Structured prompts", value: "Built-in" },
  { label: "Outputs", value: "Fully editable" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="surface-card overflow-hidden rounded-3xl p-6 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Powered by Lovable AI
        </span>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
          Your AI workplace productivity assistant
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Draft emails, summarise meetings, plan projects, research topics, resolve helpdesk
          tickets, prepare interviews and build CVs — all from one clean workspace, with drafts you stay in control of.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/email"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start with an email <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <MessageSquare className="size-4" /> Open chatbot
          </Link>
        </div>
        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-background p-4">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Workspaces</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="surface-card group rounded-2xl p-5 transition-shadow hover:shadow-[var(--shadow-float)]"
            >
              <span className="brand-gradient mb-4 flex size-10 items-center justify-center rounded-xl">
                <tool.icon className="size-5 text-primary-foreground" />
              </span>
              <h3 className="text-base font-semibold">{tool.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {tool.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
