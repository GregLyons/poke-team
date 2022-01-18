import {
  SetStateAction,
  useRef,
  useState,
} from 'react';

type ConnectionAccordionProps = {
  accordionData: {
    title: string
    content: false | JSX.Element
  }[]
}

const ConnectionAccordion = ({
  accordionData,
}: ConnectionAccordionProps) => {
  const [activeElement, setActiveElement] = useState(accordionData.map(() => false));

  // Clicking on title element sets which accordion item is active
  const handleClick = (newIdx: number) => {
    setActiveElement(activeElement.map((d, idx) => {
      // Open clicked element, unless that element is already open.
      if (idx === newIdx && d !== true) return true;
      // Close other elements, including an open element that has been clicked again.
      else return false;
    }));
  }

  return (
    <div className="planner__accordion">
      {accordionData.map(({title, content}, idx) => (
        // Order of accordion of the accordion items will not change, so index as key is ok
        content && <EntityConnectionAccordionItem
          key={idx}
          title={title}
          content={content}

          handleClick={handleClick}
          active={activeElement[idx]}
          idx={idx}
        />
      ))}
    </div>
  );
};

type EntityConnectionAccordionItemProps = {
  title: string
  content: JSX.Element

  active: boolean
  handleClick: (idx: number) => void
  idx: number
}

const EntityConnectionAccordionItem = ({
  title,
  content,

  active,
  handleClick,
  idx,
}: EntityConnectionAccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="planner__accordion-item">
      <div 
        className="planner__accordion-title"
        onClick={() => handleClick(idx)}
      >
        <h2>{title}</h2>
        <div>
          {active ? '-' : '+'}
        </div>
      </div>
      <div 
        ref={contentRef}
        className="planner__accordion-content"
        style={
          active 
            ? {height: contentRef.current?.scrollHeight}
            : {height: 0}
        }
      >
        {content}
      </div>
    </div>
  )
}

export default ConnectionAccordion