import { SITE } from "@/content/site";

/**
 * The ruled title block every drawing sheet carries, bottom-right.
 *
 * This is where the sheet's metadata legitimately lives — system, sheet number,
 * scale, revision. Drafting puts it here, which is why this project has no
 * kicker labels floating above headings.
 */
export function TitleBlock({
  system,
  sheet,
  scale = "NTS",
  rev = "A",
  tint = "var(--color-object)",
}: {
  system?: string;
  sheet: string;
  scale?: string;
  rev?: string;
  tint?: string;
}) {
  return (
    <div
      className="border-object/70 text-object grid w-full max-w-md grid-cols-[1fr_auto_auto] border text-[11px] leading-none"
      style={{ borderColor: tint }}
    >
      <Cell label="System" value={system ?? "—"} tint={tint} />
      <Cell label="Sheet" value={sheet} tint={tint} />
      <Cell label="Rev" value={rev} tint={tint} last />
      <Cell label="Drawn by" value={SITE.name} tint={tint} bottom />
      <Cell label="Scale" value={scale} tint={tint} bottom />
      <Cell label="Units" value="SI" tint={tint} bottom last />
    </div>
  );
}

function Cell({
  label,
  value,
  tint,
  last = false,
  bottom = false,
}: {
  label: string;
  value: string;
  tint: string;
  last?: boolean;
  bottom?: boolean;
}) {
  return (
    <div
      className={`px-2.5 py-2 ${last ? "" : "border-r"} ${bottom ? "border-t" : ""}`}
      style={{ borderColor: tint }}
    >
      <span className="lettering text-[9px] opacity-60">{label}</span>
      <span
        className="mt-1 block whitespace-nowrap"
        style={{ fontFamily: "var(--font-dim)" }}
        data-figures="tabular"
      >
        {value}
      </span>
    </div>
  );
}
