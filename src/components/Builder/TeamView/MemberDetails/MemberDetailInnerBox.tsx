import { GenNum } from "../../../../types-queries/entities";

type MemberDetailInnerBoxProps = {
  focusRef?: React.RefObject<HTMLDivElement> | undefined
  forClass: string
  header: string
  title: string
  content: JSX.Element

  active?: boolean
  onContentClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  interactive?: boolean

  gen?: GenNum
  minGen?: GenNum
  excludeGens?: GenNum[]
};

const MemberDetailInnerBox = ({
  focusRef,
  forClass,
  header,
  title,
  content,

  active,
  onContentClick,
  interactive,

  gen,
  minGen,
  excludeGens,
}: MemberDetailInnerBoxProps) => {
  const invalidGen = gen && (
    (minGen && gen < minGen)
    || (excludeGens && excludeGens.includes(gen))
  );

  
  return (
    <div
      ref={focusRef}
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
      <button
        title={invalidGen
          ? 'Not available in this Gen.'
          : title
        }
        className="member-details__inner-content"
        onClick={onContentClick && !invalidGen ? onContentClick : () => {}}
        disabled={!onContentClick || invalidGen}
        aria-disabled={!onContentClick || invalidGen}
      >
        {invalidGen ? '' : content}
      </button>
    </div>
  );
};

export default MemberDetailInnerBox;