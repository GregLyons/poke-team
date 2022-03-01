export type CoverageDatum = {
  total: number
  psIDs: string[]
}

export const incrementCoverageDatum = (coverageDatum: CoverageDatum, psID: string, psIDs?: string[]) => {
  return psIDs
    ? {
        total: coverageDatum.total++,
        psIDs: psID === ''
          ? coverageDatum.psIDs.concat(psIDs)
          : coverageDatum.psIDs.concat(psID).concat(psIDs),
      }
    : {
        total: coverageDatum.total++,
        psIDs: coverageDatum.psIDs.concat(psID),
      };
}

export const INITIAL_COVERAGEDATUM: CoverageDatum = {
  total: 0,
  psIDs: [] as string[],
};