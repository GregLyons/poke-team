import { DocumentNode } from 'graphql';
import {
  useState,
} from 'react';

type SpecificEntitySearchProps = {
  query: DocumentNode,
}

type EntityAccordionProps = {
  accordionData: {
    title: string
    content: ({ query }: SpecificEntitySearchProps) => JSX.Element
  }[]
}

const EntityAccordion = ({
  accordionData,
}: EntityAccordionProps) => {

  return (
    <div className="accordion">
      {accordionData.map(({title, content}, idx) => (
        // Order of accordion of the accordion items will not change, so index as key is ok
        <EntityAccordionItem
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
  content: ({ query }: SpecificEntitySearchProps) => JSX.Element
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
        <div>
          {title}
        </div>
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