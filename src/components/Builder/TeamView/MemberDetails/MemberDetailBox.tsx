import { GenNum } from "../../../../types-queries/helpers"

type MemberDetailBoxProps = {
  forClass: string
  header: string
  content: JSX.Element

  active?: boolean
  onContentClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  hasInnerBox?: boolean
  interactive?: boolean

  gen?: GenNum
  minGen?: GenNum
  excludeGens?: GenNum[]
}

const MemberDetailBox = ({
  forClass,
  header,
  content,

  active,
  onContentClick,
  hasInnerBox,
  interactive,

  gen,
  minGen,
  excludeGens,
}: MemberDetailBoxProps) => {
  const invalidGen = gen && minGen && excludeGens && (gen < minGen || excludeGens.includes(gen));

  return (
    <div
      className={`
        member-details__box
        member-details__${forClass}
        ${invalidGen
          ? '--disabled'
          : ''}
        ${active
          ? `--active`
          : ''}
        ${hasInnerBox
          ? `--has-inner-box`
          : ''
        }
        ${interactive
          ? '--interactive'
          : ''}
      `}
    >
      <div className="member-details__header">
        {invalidGen
        ? ''
        : active 
          ? 'Active'
          :header}
      </div>
      <div
        className={`
          member-details__content
        `}
        onClick={onContentClick && !invalidGen ? onContentClick : () => {}}
      >
        {invalidGen ? '' : content}
      </div>
    </div>
  );
};

export default MemberDetailBox;
