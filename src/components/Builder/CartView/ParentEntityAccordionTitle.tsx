type ParentEntityAccordionTitleProps = {
  titleText: string
}

const ParentEntityAccordionTitle = ({
  titleText,
}: ParentEntityAccordionTitleProps) => {
  return (
    <>
      <div
        className="cart-view-accordion__title"
      >
        {titleText}
      </div>
    </>
  );
};

export default ParentEntityAccordionTitle;