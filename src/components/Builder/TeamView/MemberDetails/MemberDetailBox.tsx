import { GenNum } from "../../../../types-queries/entities"

type MemberDetailBoxProps = {
  focusRef?: React.RefObject<HTMLDivElement> | undefined
  forClass: string
  header: string
  title?: string
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
  focusRef,
  forClass,
  header,
  title,
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
      ref={focusRef}
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
          : header}
      </div>
      <button
        title={invalidGen
          ? 'Not available in this Gen.'
          : hasInnerBox
            ? ''
            : title
        }
        className={`
          member-details__content
        `}
        onClick={onContentClick && !invalidGen ? onContentClick : () => {}}
        disabled={!onContentClick || invalidGen}
        aria-disabled={!onContentClick || invalidGen}
      >
        {invalidGen ? '' : content}
      </button>
    </div>
  );
};

export default MemberDetailBox;
