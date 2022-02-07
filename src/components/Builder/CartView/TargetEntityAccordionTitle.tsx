type TargetEntityAccordionTitleProps = {
  titleText: string
}

const TargetEntityAccordionTitle = ({
  titleText,
}: TargetEntityAccordionTitleProps) => {
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

export default TargetEntityAccordionTitle;