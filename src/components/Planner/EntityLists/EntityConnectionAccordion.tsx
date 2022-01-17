import {
  useState,
} from 'react';

type EntityConnectionAccordionProps = {
  accordionData: {
    title: string
    content: false | JSX.Element
  }[]
}

const EntityConnectionAccordion = ({
  accordionData,
}: EntityConnectionAccordionProps) => {

  return (
    <div className="planner__accordion">
      {accordionData.map(({title, content}, idx) => (
        // Order of accordion of the accordion items will not change, so index as key is ok
        content && <EntityConnectionAccordionItem
          key={idx}
          title={title}
          content={content}
        />
      ))}
    </div>
  );
};

type EntityConnectionAccordionItemProps = {
  title: string
  content: JSX.Element
}

const EntityConnectionAccordionItem = ({
  title,
  content,
}: EntityConnectionAccordionItemProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="planner__accordion-item">
      <div 
        className="planner__accordion-title"
        onClick={() => setIsActive(!isActive)}
      >
        <h2>{title}</h2>
        <div>
          {isActive ? '-' : '+'}
        </div>
      </div>
      {isActive && <div className="planner__accordion-content">
        {content}
      </div>}
    </div>
  )
}

export default EntityConnectionAccordion