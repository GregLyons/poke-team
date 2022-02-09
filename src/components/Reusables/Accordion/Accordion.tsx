import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem";

import './Accordion.css';

type AccordionProps = {
  entireTitleClickable?: boolean
  accordionContext: string
  accordionData: {
    title: JSX.Element
    content: false | JSX.Element
  }[]
  initialActiveElements?: boolean[]
  initialOpenedElements?: boolean[]
}

const Accordion = ({
  entireTitleClickable = true,
  accordionContext,
  accordionData,
  initialActiveElements = accordionData.map(() => false),
  initialOpenedElements = accordionData.map(() => false),
}: AccordionProps) => {
  // Boolean array for which elements are currently open
  const [activeElements, setActiveElements] = useState(initialActiveElements);

  // Element has been opened, so there's no need to re-render it since we have already loaded its contents
  const [openedElements, setOpenedElements] = useState(initialOpenedElements);

  // When accordion has one item, open that item if it hasn't been opened before.
  useEffect(() => {
    // Check that no elements have been opened
    // Then, check that the number of elements with actual content in the accordion is 1
    if (openedElements.filter(d => d).length === 0
        && accordionData.map(d => d && true).length === 1) {
      // Set the single element to be active
      setActiveElements(accordionData.map(d => d && true));
      // Set the newly active element to be open
      setOpenedElements(accordionData.map(d => d && true));
    }
  }, [accordionData, setActiveElements, setOpenedElements, openedElements]);

  // Clicking on title element toggles whether the accordion item is active, and sets the item to 'opened'
  const handleClick = (newIdx: number) => {
    // Toggle 'active' state for clicked element
    setActiveElements(activeElements.map((d, idx) => {
      // Toggle element
      if (idx === newIdx) return !d;
      else return d;
    }));

    console.log(activeElements);
    
    // Turn on 'opened' state for clicked element
    setOpenedElements(openedElements.map((d, idx) => {
      if (idx === newIdx) return true;
      else return d;
    }));
  }

  return (
    <div className="accordion">
      {accordionData.map(({title, content}, idx) => (
        content && <AccordionItem
          entireTitleClickable={entireTitleClickable}
          title={title}
          content={content}
          
          handleClick={handleClick}
          active={activeElements[idx]}
          opened={openedElements[idx]}
          idx={idx}

          accordionContext={accordionContext}
        />
      ))}
    </div>
  );
}

export default Accordion;