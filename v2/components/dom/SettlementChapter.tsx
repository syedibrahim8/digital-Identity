import type { Chapter } from "@/content/chapters";
import { SETTLEMENT } from "@/content/settlement";
import { ChapterSection } from "./ChapterSection";
import { SettlementDrawing } from "./SettlementDrawing";
import { L5Diagram } from "./L5Diagram";

/**
 * The 2018 space settlement, as its own sheet.
 *
 * Renders completely with no assets: the drawing carries it, unsupplied specs
 * render as em dashes, and document frames render empty-but-labelled rather
 * than disappearing — so the sheet is never half a page waiting on a file.
 */
export function SettlementChapter({ chapter }: { chapter: Chapter }) {
  return (
    <ChapterSection chapter={chapter}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <h2 className="text-4xl sm:text-5xl">{SETTLEMENT.title}</h2>

          <p className="text-object mt-5 max-w-[42ch] text-xl leading-snug">
            {SETTLEMENT.thesis}
          </p>

          <div className="mt-6 flex flex-wrap items-start gap-6">
            <L5Diagram className="w-36 shrink-0" />
            <p className="text-read max-w-[52ch] flex-1 text-sm leading-relaxed">
              {SETTLEMENT.body}
            </p>
          </div>

          {/* Sector legend — the numbers match the balloons on the elevation. */}
          <ul className="border-object/30 mt-8 border-t">
            {SETTLEMENT.sectors.map((sector) => (
              <li
                key={sector.n}
                className="border-object/15 flex gap-4 border-b py-2.5"
              >
                <span
                  className="border-annotate text-annotate mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border"
                  style={{ fontFamily: "var(--font-dim)", fontSize: "9px" }}
                  aria-hidden="true"
                >
                  {sector.n}
                </span>
                <div>
                  <h3 className="text-object text-sm">{sector.name}</h3>
                  <p className="text-read-soft text-xs leading-relaxed">
                    {sector.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Specification schedule. Unsupplied values read as em dashes. */}
          <dl className="border-object/30 mt-9 border-t">
            {SETTLEMENT.specs.map((spec) => (
              <div
                key={spec.label}
                className="border-object/15 grid grid-cols-[1fr_auto] gap-4 border-b py-2.5"
              >
                <dt className="lettering text-read-soft text-[10px]">
                  {spec.label}
                </dt>
                <dd
                  className="dimension text-object"
                  data-figures="tabular"
                >
                  {spec.value ? `${spec.value}${spec.unit ? ` ${spec.unit}` : ""}` : "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <SettlementDrawing className="w-full" />

          {/* Reference documents, pinned to the sheet as a drawing set carries. */}
          <ul className="mt-8 grid grid-cols-3 gap-4">
            {SETTLEMENT.documents.map((doc) => (
              <li key={doc.id}>
                <div
                  className={`border-construct/60 bg-vellum-tint/60 relative border border-dashed ${
                    doc.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  {doc.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={doc.src}
                      alt={doc.caption}
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <span className="dimension text-construct absolute inset-0 flex items-center justify-center">
                      REF
                    </span>
                  )}
                </div>
                <p className="text-read-soft mt-2 text-[11px] leading-snug">
                  {doc.caption}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ChapterSection>
  );
}
