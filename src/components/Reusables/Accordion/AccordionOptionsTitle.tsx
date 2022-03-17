import FontAwesome from "react-fontawesome";

type AccordionOptionsTitleProps = {
  title: JSX.Element

  active: boolean
  handleOpenClick: (newIdx: number) => void
  idx: number

  accordionContext: string
};

const AccordionOptionsTitle = ({
  title,

  active,
  handleOpenClick,
  idx,

  accordionContext,
}: AccordionOptionsTitleProps) => {
  return (
    <div
      className={`
        accordion__title-wrapper 
        ${accordionContext}-accordion__title-wrapper
      `}
    >
        <div 
          className={`
            accordion__title-element-wrapper
            ${accordionContext}-accordion__title-element-wrapper`
          }
        >
          {title}
        </div>
        <button 
          className={`
            accordion__title-trigger-wrapper
            ${accordionContext}-accordion__title-trigger-wrapper
            accordion__title-trigger-wrapper--clickable
          `}
          onClick={(e) => {
            e.preventDefault();
            handleOpenClick(idx);
          }}
        >
          {active 
            ? <FontAwesome name="angle-up" />
            : <FontAwesome name="angle-down" />
          }
        </button>
    </div>
  );
};

export default AccordionOptionsTitle;