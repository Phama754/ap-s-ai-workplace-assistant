import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutput } from "@/components/AiOutput";
import { Disclaimer } from "@/components/Disclaimer";
import { askAssistant } from "@/lib/assistant-client";
import type { ToolDef } from "@/lib/tools";

export function ToolWorkspace({ tool }: { tool: ToolDef }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      tool.fields.map((f) => [f.name, f.type === "select" ? (f.options?.[0] ?? "") : ""]),
    ),
  );
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (name: string, v: string) => setValues((p) => ({ ...p, [name]: v }));

  const generate = async () => {
    const missing = tool.fields.find((f) => f.required && !values[f.name]?.trim());
    if (missing) {
      toast.error(`Please fill in “${missing.label}”.`);
      return;
    }
    setBusy(true);
    try {
      setOutput(await askAssistant({ kind: "tool", tool: tool.id, values }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="brand-gradient flex size-10 items-center justify-center rounded-xl">
            <tool.icon className="size-5 text-primary-foreground" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold">{tool.name}</h1>
            <p className="text-sm text-muted-foreground">{tool.tagline}</p>
          </div>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">{tool.description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
        <div className="surface-card space-y-4 rounded-2xl p-5">
          {tool.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {field.label}
              </Label>
              {field.type === "textarea" && (
                <Textarea
                  id={field.name}
                  rows={field.rows ?? 4}
                  placeholder={field.placeholder ?? ""}
                  value={values[field.name] ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                />
              )}
              {field.type === "text" && (
                <Input
                  id={field.name}
                  placeholder={field.placeholder ?? ""}
                  value={values[field.name] ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                />
              )}
              {field.type === "select" && (
                <Select
                  value={values[field.name] ?? ""}
                  onValueChange={(v) => set(field.name, v)}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(field.options ?? []).map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
          <Button onClick={generate} disabled={busy} className="w-full">
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {busy ? "Working…" : tool.cta}
          </Button>
          <Disclaimer />
        </div>

        <div>
          {output ? (
            <AiOutput
              value={output}
              onChange={setOutput}
              onRegenerate={generate}
              busy={busy}
            />
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
              <Sparkles className="mb-3 size-6 text-primary" />
              <p className="text-sm font-medium">Your editable draft appears here</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Fill in the prompt fields and generate. You can edit, preview and copy the
                result before using it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
