export type CoverageDatum = {
  total: number
  memberPSIDs: {
    [key: string]: string[]
  }
}

export const incrementCoverageDatum = (coverageDatum: CoverageDatum, memberPSID: string, entityPSIDs: string[]) => {
  return {
    total: coverageDatum.total + 1,
    memberPSIDs: {
      ...coverageDatum.memberPSIDs,
      [memberPSID]: (coverageDatum.memberPSIDs[memberPSID] || []).concat(entityPSIDs),
    },
  };
}

export const INITIAL_COVERAGEDATUM: CoverageDatum = {
  total: 0,
  memberPSIDs: {},
};