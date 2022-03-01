import { MemberPokemon } from "../../../../types-queries/Builder/MemberPokemon";

type AnalyzerMemberProps = {
  member: MemberPokemon | null
};

const AnalyzerMember = ({
  member,
}: AnalyzerMemberProps) => {
  return (
    <div
      className="analyzer-member__wrapper"
    >
      Yo
    </div>
  )
};

export default AnalyzerMember;