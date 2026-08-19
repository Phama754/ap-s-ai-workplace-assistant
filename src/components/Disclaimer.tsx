import { ShieldCheck } from "lucide-react";

export function Disclaimer({ className }: { className?: string }) {
  return (
    <div
      className={`flex gap-3 rounded-xl border border-border bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground ${className ?? ""}`}
    >
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
      <p>
        <span className="font-semibold text-foreground">Responsible AI notice — </span>
        outputs are AI-generated drafts and may be inaccurate, incomplete or biased. Always
        review and edit before sharing, and never paste confidential, personal or regulated
        data you are not permitted to process. You remain accountable for anything you send.
      </p>
    </div>
  );
}
