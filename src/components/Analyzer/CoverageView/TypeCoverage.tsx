import { useMemo } from "react";
import { AbilityCoverageQuery, computeTypeCoverage, ItemCoverageQuery, MoveCoverageQuery } from "../../../types-queries/Analyzer/Coverage";
import { Filters } from "../../App";

type TypeCoverageProps = {
  moveData: MoveCoverageQuery
  filters: Filters
};

const TypeCoverage = ({
  moveData,
  filters,
}: TypeCoverageProps) => {
  const typeCoverageMap = useMemo(() => {
    return computeTypeCoverage(moveData.movesByPSID, filters.genFilter.gen);
  }, [moveData, filters, ]);

  return (
    <div>TypeCoverage</div>
  )
};

export default TypeCoverage;