import { GenNum } from "../../../../types-queries/helpers";

type MemberDetailInnerBoxProps = {
  forClass: string
  header: string
  content: JSX.Element

  active?: boolean
  onContentClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  interactive?: boolean

  gen?: GenNum
  minGen?: GenNum
  excludeGens?: GenNum[]
};

const MemberDetailInnerBox = ({
  forClass,
  header,
  content,

  active,
  onContentClick,
  interactive,

  gen,
  minGen,
  excludeGens,
}: MemberDetailInnerBoxProps) => {
  const invalidGen = gen && minGen && excludeGens && (gen < minGen || excludeGens.includes(gen));
  
  return (
    <div
      className={`
        member-details__inner-box
        member-details__${forClass}
        ${invalidGen
          ? '--disabled'
          : ''
        }
        ${active
          ? '--active'
          : ''}
        ${interactive
          ? '--interactive'
          : ''}
      `}
    >
      <div className="member-details__inner-header">
          {invalidGen
          ? ''
          : active 
            ? 'Active'
            :header}
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