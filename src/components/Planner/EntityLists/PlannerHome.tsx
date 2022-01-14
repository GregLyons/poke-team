import { GenerationNum } from "../../../types-queries/Generation";

type PlannerHomeProps = {
  gen: GenerationNum
}

const PlannerHome = ({ gen }: PlannerHomeProps) => (
  <div>
    This is the planner page.
  </div>
);

export default PlannerHome;