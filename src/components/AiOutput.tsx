import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Check, Copy, Eye, Pencil, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (next: string) => void;
  onRegenerate?: (() => void) | undefined;
  busy?: boolean;
};

export function AiOutput({ value, onChange, onRegenerate, busy }: Props) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="surface-card rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">AI draft</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={() => setEditing((e) => !e)}>
            {editing ? <Eye className="size-4" /> : <Pencil className="size-4" />}
            {editing ? "Preview" : "Edit"}
          </Button>
          <Button variant="ghost" size="sm" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          {onRegenerate && (
            <Button variant="outline" size="sm" onClick={onRegenerate} disabled={busy}>
              <RotateCcw className="size-4" />
              Regenerate
            </Button>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-5">
        {editing ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[420px] resize-y font-mono text-sm leading-relaxed"
          />
        ) : (
          <div className="ai-output text-sm text-foreground">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
