import { GenerationNum } from "../../types-queries/Generation";

type AnalyzerProps = {
  gen: GenerationNum
}

const Analyzer = ({ gen }: AnalyzerProps) => {
  return (
    <div>I'm the analyzer</div>
  );
}
export default Analyzer;