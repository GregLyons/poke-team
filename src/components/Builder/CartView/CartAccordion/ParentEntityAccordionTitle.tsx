type ParentEntityAccordionTitleProps = {
  titleText: string
}

const ParentEntityAccordionTitle = ({
  titleText,
}: ParentEntityAccordionTitleProps) => {
  return (
    <>
      <h2
        className="cart-view-accordion__title"
      >
        {titleText}
      </h2>
    </>
  );
};

export default ParentEntityAccordionTitle;