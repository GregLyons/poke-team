type BoxAccordionTitleProps = {
  titleText: string
}

const BoxAccordionTitle = ({
  titleText,
}: BoxAccordionTitleProps) => {
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

export default BoxAccordionTitle;