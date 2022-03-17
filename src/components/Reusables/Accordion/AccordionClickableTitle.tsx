import FontAwesome from "react-fontawesome";

type AccordionClickableTitleProps = {
  title: JSX.Element

  active: boolean
  handleOpenClick: (newIdx: number) => void
  idx: number

  accordionContext: string
};

const AccordionClickableTitle = ({
  title,

  active,
  handleOpenClick,
  idx,

  accordionContext,
}: AccordionClickableTitleProps) => {
  return (
    <button
      title={active ? "Close entry." : "Open entry."}
      className={`
        accordion__title-wrapper 
        ${accordionContext}-accordion__title-wrapper
        --clickable
      `}
      onClick={(e) => {
        e.preventDefault();
        handleOpenClick(idx);
      }}
    >
        <div 
          className={`
            accordion__title-element-wrapper
            ${accordionContext}-accordion__title-element-wrapper`
          }
        >
          {title}
        </div>
        <div 
          className={`
            accordion__title-trigger-wrapper
            ${accordionContext}-accordion__title-trigger-wrapper
          `}
        >
          {active 
            ? <FontAwesome name="angle-up" />
            : <FontAwesome name="angle-down" />
          }
        </div>
    </button>
  );
};

export default AccordionClickableTitle;