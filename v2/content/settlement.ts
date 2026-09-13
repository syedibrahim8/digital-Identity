/**
 * The 2018 space settlement project: NASA Ames, and the design presented to the
 * National Space Society conference.
 *
 * This gets a full sheet rather than a credential line. Space settlement designs
 * are published as engineering drawings — cutaway sections, dimensioned radii,
 * rotation rates — so it is already native to this drawing set.
 *
 * Figures not supplied by Ibrahim stay null and render as an em dash. Nothing
 * numeric here is invented: a plausible-looking spec would be a fabricated
 * claim about his design.
 */

export type SettlementSpec = {
  label: string;
  value: string | null;
  unit?: string;
};

export type SettlementSector = {
  n: string;
  name: string;
  detail: string;
};

export type SettlementDocument = {
  id: string;
  caption: string;
  /** Path under /public once supplied; null renders an empty labelled frame. */
  src: string | null;
  orientation: "portrait" | "landscape";
};

export const SETTLEMENT = {
  title: "A colony at L5",
  year: "2018",
  venue: "National Space Society conference",
  host: "NASA Ames Research Center",

  thesis:
    "Build at Earth–Moon L5, not Mars. It is one of the two gravitationally stable Lagrange points: a structure placed there holds position indefinitely, without propellant.",

  body:
    "L4 and L5 sit at the corners of an equilateral triangle with Earth and the Moon, and unlike the other Lagrange points they are stable — objects settle into them rather than drifting out, which is why Trojan asteroids accumulate at Jupiter's. That makes L5 the cheapest place to put something permanent: it stays put on its own, it is days from Earth rather than months, and it can be built and supplied from lunar material instead of lifting every tonne out of Earth's gravity well.",

  /** The habitat: four tori threaded on a central shaft, each spinning for gravity. */
  sectors: [
    { n: "1", name: "Residential", detail: "Housing and daily life." },
    { n: "2", name: "Agriculture", detail: "Food production and the closed water loop." },
    { n: "3", name: "Research & development", detail: "Laboratories and human research." },
    { n: "4", name: "Industrial", detail: "Manufacturing and materials processing." },
  ] as SettlementSector[],

  /*
   * Only figures Ibrahim actually recalls. Radius and population were dropped
   * rather than shown as blanks: a spec table with holes reads as unfinished,
   * and inventing plausible numbers would be a fabricated claim about a real
   * design. Add rows here if the originals turn up.
   */
  specs: [
    { label: "Habitat", value: "Central shaft, four rotating tori" },
    { label: "Station", value: "Earth–Moon L5" },
    { label: "Sectors", value: "4" },
    { label: "Presented", value: "2018" },
  ] as SettlementSpec[],

  documents: [
    {
      id: "invitation",
      caption: "Invitation letter",
      src: null,
      orientation: "portrait",
    },
    {
      id: "visit",
      caption: "NASA Ames Research Center",
      src: null,
      orientation: "landscape",
    },
    {
      id: "presenting",
      caption: "Presenting at the NSS conference",
      src: null,
      orientation: "landscape",
    },
  ] as SettlementDocument[],
};
