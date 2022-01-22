import {
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
  // Element is currently open
  // If accordion has only one item, open by default.
  const [activeElement, setActiveElement] = useState(accordionData.map(() => false));
  // Element has been opened, so there's no need to re-render it since we have already loaded its contents
  // If accordion has only one item, open by default.
  const [openedElement, setOpenedElement] = useState(accordionData.map(() => false));

  // Clicking on title element sets which accordion item is active
  const handleClick = (newIdx: number) => {
    setActiveElement(activeElement.map((d, idx) => {
      // Toggle element
      if (idx === newIdx) return !d;
      else return d;
    }));

    setOpenedElement(openedElement.map((d, idx) => {
      if (idx === newIdx) return true;
      else return d;
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
          opened={openedElement[idx]}
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
  opened: boolean
  handleClick: (idx: number) => void
  idx: number
}

const EntityConnectionAccordionItem = ({
  title,
  content,

  active,
  opened,
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
            ? { 
              // Doesn't get transition animation
                height: 'auto',
              }
            : {
                height: 0,
              }
        }
      >
        {opened && content}
      </div>
    </div>
  )
}

export default ConnectionAccordion