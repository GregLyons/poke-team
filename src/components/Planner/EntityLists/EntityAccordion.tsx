import {
  useState,
} from 'react';

type EntityAccordionProps = {
  accordionData: {
    title: string
    content: false | JSX.Element
  }[]
}

const EntityAccordion = ({
  accordionData,
}: EntityAccordionProps) => {

  return (
    <div className="accordion">
      {accordionData.map(({title, content}, idx) => (
        // Order of accordion of the accordion items will not change, so index as key is ok
        content && <EntityAccordionItem
          key={idx}
          title={title}
          content={content}
        />
      ))}
    </div>
  );
};

type EntityAccordionItemProps = {
  title: string
  content: JSX.Element
}

const EntityAccordionItem = ({
  title,
  content,
}: EntityAccordionItemProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="accordion-item">
      <div 
        className="accordion-title"
        onClick={() => setIsActive(!isActive)}
      >
        <h2>{title}</h2>
        <div>
          {isActive ? '-' : '+'}
        </div>
      </div>
      {isActive && <div className="accordion-content">
        {content}
      </div>}
    </div>
  )
}

export default EntityAccordion