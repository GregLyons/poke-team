import {
  useRef,
  useState,
} from 'react';

type CartViewAccordionRole = 'parent-entity' | 'target-entity' | 'note' | 'intersection';

type CartViewAccordionProps = {
  accordionData: {
    title: string
    content: false | JSX.Element
  }[]
  accordionRole: CartViewAccordionRole
}

const CartViewAccordion = ({
  accordionData,
  accordionRole,
}: CartViewAccordionProps) => {
  // Element is currently open
  // If accordion has only one item, open by default.
  const [activeElement, setActiveElement] = useState(accordionData.map(() => accordionData.length === 1));
  // Element has been opened, so there's no need to re-render it since we have already loaded its contents
  // If accordion has only one item, open by default.
  const [openedElement, setOpenedElement] = useState(accordionData.map(() => accordionData.length === 1));

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
    <div className={`builder__accordion builder__accordion--${accordionRole}`}>
      {accordionData.map(({title, content}, idx) => (
        // Order of accordion of the accordion items will not change, so index as key is ok
        content && <CartViewAccordionItem
          key={idx}
          title={title}
          content={content}
          accordionRole={accordionRole}

          handleClick={handleClick}
          active={activeElement[idx]}
          opened={openedElement[idx]}
          idx={idx}
        />
      ))}
    </div>
  );
};

type CartViewAccordionItemProps = {
  title: string
  content: JSX.Element
  accordionRole: CartViewAccordionRole

  active: boolean
  opened: boolean
  handleClick: (idx: number) => void
  idx: number
}

const CartViewAccordionItem = ({
  title,
  content,
  accordionRole,

  active,
  opened,
  handleClick,
  idx,
}: CartViewAccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`builder__accordion-item builder__accordion-item--${accordionRole}`}>
      <div 
        className={`builder__accordion-title builder__accordion-title--${accordionRole}`}
        onClick={() => {
          // Set 'active'
          handleClick(idx);
        }}
      >
        <h2>{title}</h2>
        <div>
          {active ? '-' : '+'}
        </div>
      </div>
      <div 
        ref={contentRef}
        className={`builder__accordion-content builder__accordion-content--${accordionRole}`}
        style={
          active 
            ? {
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

export default CartViewAccordion;