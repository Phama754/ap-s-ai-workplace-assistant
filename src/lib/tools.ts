import type { LucideIcon } from "lucide-react";
import { Mail, NotebookPen, ListChecks, Search } from "lucide-react";

export type FieldType = "text" | "textarea" | "select";

export type ToolField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  rows?: number;
};

export type ToolId = "email" | "notes" | "planner" | "research";

export type ToolDef = {
  id: ToolId;
  path: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  cta: string;
  fields: ToolField[];
};

export const TOOLS: ToolDef[] = [
  {
    id: "email",
    path: "/email",
    name: "Smart Email Generator",
    tagline: "Draft polished emails in seconds",
    description:
      "Turn a few bullet points into a well-structured, on-tone email ready to send.",
    icon: Mail,
    cta: "Generate email",
    fields: [
      {
        name: "recipient",
        label: "Recipient & context",
        type: "text",
        placeholder: "Head of Finance, external client, whole team…",
        required: true,
      },
      {
        name: "purpose",
        label: "What should the email achieve?",
        type: "textarea",
        rows: 5,
        placeholder:
          "Follow up on the Q3 budget review, ask for approval by Friday, mention the attached forecast…",
        required: true,
      },
      {
        name: "tone",
        label: "Tone",
        type: "select",
        options: ["Professional", "Friendly", "Direct", "Persuasive", "Apologetic"],
      },
      {
        name: "length",
        label: "Length",
        type: "select",
        options: ["Short", "Medium", "Detailed"],
      },
    ],
  },
  {
    id: "notes",
    path: "/notes",
    name: "Meeting Notes Summarizer",
    tagline: "From raw transcript to clear actions",
    description:
      "Paste notes or a transcript and get a summary, decisions, risks and owner-tagged action items.",
    icon: NotebookPen,
    cta: "Summarize notes",
    fields: [
      {
        name: "transcript",
        label: "Meeting notes or transcript",
        type: "textarea",
        rows: 12,
        placeholder: "Paste the raw notes or transcript here…",
        required: true,
      },
      {
        name: "attendees",
        label: "Attendees (optional)",
        type: "text",
        placeholder: "Anita, Sipho, Dana…",
      },
      {
        name: "focus",
        label: "Summary style",
        type: "select",
        options: ["Balanced", "Action-focused", "Executive brief", "Detailed minutes"],
      },
    ],
  },
  {
    id: "planner",
    path: "/planner",
    name: "AI Task Planner",
    tagline: "Break big goals into a real plan",
    description:
      "Convert an objective into a prioritised, time-boxed plan with dependencies and milestones.",
    icon: ListChecks,
    cta: "Build plan",
    fields: [
      {
        name: "goal",
        label: "Goal or project",
        type: "textarea",
        rows: 4,
        placeholder: "Launch the new onboarding flow for enterprise customers…",
        required: true,
      },
      {
        name: "timeframe",
        label: "Timeframe",
        type: "text",
        placeholder: "Next 2 weeks, by end of quarter…",
      },
      {
        name: "constraints",
        label: "Constraints & resources",
        type: "textarea",
        rows: 3,
        placeholder: "Team of 3, no design support until the 20th…",
      },
      {
        name: "style",
        label: "Plan format",
        type: "select",
        options: ["Daily checklist", "Weekly sprint plan", "Milestone roadmap"],
      },
    ],
  },
  {
    id: "research",
    path: "/research",
    name: "AI Research Assistant",
    tagline: "Structured briefings on any topic",
    description:
      "Get an organised briefing with key findings, comparisons, open questions and next steps.",
    icon: Search,
    cta: "Research topic",
    fields: [
      {
        name: "topic",
        label: "Topic or question",
        type: "textarea",
        rows: 4,
        placeholder: "How are mid-market SaaS companies pricing AI add-ons?",
        required: true,
      },
      {
        name: "audience",
        label: "Audience",
        type: "text",
        placeholder: "Exec team, product managers, new hires…",
      },
      {
        name: "depth",
        label: "Depth",
        type: "select",
        options: ["Quick overview", "Standard briefing", "Deep dive"],
      },
    ],
  },
];

export function getTool(id: ToolId) {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) throw new Error(`Unknown tool: ${id}`);
  return tool;
}
