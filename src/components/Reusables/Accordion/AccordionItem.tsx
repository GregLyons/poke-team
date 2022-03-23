import { useRef } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import AccordionClickableTitle from "./AccordionClickableTitle";
import AccordionOptionsTitle from "./AccordionOptionsTitle";

type AccordionItemProps = {
  title: JSX.Element
  content: JSX.Element

  active: boolean
  opened: boolean
  handleOpenClick: (newIdx: number) => void
  idx: number

  accordionContext: string
  optionsInTitle: boolean
}

const AccordionItem = ({
  title,
  content,
  
  active,
  opened,
  handleOpenClick,
  idx,
  
  accordionContext,
  optionsInTitle,
}: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <li className={`accordion__item ${accordionContext}-accordion__item`}>
      <ErrorBoundary orientation="top">
        {optionsInTitle
          ? <AccordionOptionsTitle
              title={title}
              
              active={active}
              handleOpenClick={handleOpenClick}
              idx={idx}
              
              accordionContext={accordionContext}
            />
          : <AccordionClickableTitle
              title={title}
              
              active={active}
              handleOpenClick={handleOpenClick}
              idx={idx}
              
              accordionContext={accordionContext}
            />
        }
      </ErrorBoundary>
      <div
        ref={contentRef}
        className={`accordion__content-wrapper ${accordionContext}-accordion__content-wrapper`}
        style={
          // When inactive, hide the element.
          // We don't want to de-render elements that have been opened but are currently inactive; merely make them invisible and not able to receive focus
          active
            ? {
                height: 'auto',
              }
            : {
                height: 0,
                // Prevents elements inside of content from receiving focus
                visibility: 'hidden',
              }
        }
        aria-hidden={active ? "false" : "true"}
      >
        {/* Isolate error in accordion to item in which it occurs */}
        <ErrorBoundary orientation="top">
          {/* opened && content will be true so long as there is content to render and the element has been opened once */}
          {opened && content}
        </ErrorBoundary>
      </div>
    </li>
  )
}

export default AccordionItem;