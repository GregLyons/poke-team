import { useRef } from "react";
import FontAwesome from "react-fontawesome";

type AccordionItemProps = {
  title: JSX.Element
  content: JSX.Element

  active: boolean
  opened: boolean
  handleClick: (newIdx: number) => void
  idx: number

  accordionContext: string
}

const AccordionItem = ({
  title,
  content,

  active,
  opened,
  handleClick,
  idx,

  accordionContext,
}: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`accordion__item ${accordionContext}-accordion__item`}>
      <div 
        className={`accordion__title-wrapper ${accordionContext}-accordion__title-wrapper`}
        onClick={() => {
          handleClick(idx);
        }}
      >
        <div className={`accordion__title-element-wrapper ${accordionContext}-accordion__title-element-wrapper`}>
          {title}
        </div>
        <div className={`accordion__title-trigger-wrapper ${accordionContext}-accordion__title-trigger-wrapper`}>
          {active 
            ? <FontAwesome name="angle-up" />
            : <FontAwesome name="angle-down" />
          }
        </div>
      </div>
      <div
        ref={contentRef}
        className={`accordion__content-wrapper ${accordionContext}-accordion__content-wrapper`}
        style={
          // When inactive, hide the element
          active
            ? {
                height: 'auto',
              }
            : {
                height: 0,
              }
        }
      >
        {/* opened && content will be true so long as there is content to render and the element has been opened once */}
        {opened && content}
      </div>
    </div>
  )
}

export default AccordionItem;