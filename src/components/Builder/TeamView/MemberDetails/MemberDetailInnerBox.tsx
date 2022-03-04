import { GenerationNum } from "../../../../types-queries/helpers";

type MemberDetailInnerBoxProps = {
  forClass: string
  header: string
  content: JSX.Element

  active?: boolean
  onContentClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void

  gen?: GenerationNum
  minGen?: GenerationNum
  excludeGens?: GenerationNum[]
};

const MemberDetailInnerBox = ({
  forClass,
  header,
  content,

  active,
  onContentClick,

  gen,
  minGen,
  excludeGens,
}: MemberDetailInnerBoxProps) => {
  const invalidGen = gen && minGen && excludeGens && (gen < minGen || excludeGens.includes(gen));
  
  return (
    <div
      className={`
        member-details__${forClass}
        ${invalidGen
          ? 'member-details--disabled'
          : ''
        }
        ${active
          ? 'member-details__content-active'
          : ''}
      `}
    >
      <div className="member-details__inner-header">
          {invalidGen ? '' : header}
      </div>
      <div
        className="member-details__inner-content"
        onClick={onContentClick && !invalidGen ? onContentClick : () => {}}
      >
        {invalidGen ? '' : content}
      </div>
    </div>
  );
};

export default MemberDetailInnerBox;