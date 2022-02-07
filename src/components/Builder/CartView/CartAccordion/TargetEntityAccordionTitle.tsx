type TargetEntityAccordionTitleProps = {
  titleText: string
}

const TargetEntityAccordionTitle = ({
  titleText,
}: TargetEntityAccordionTitleProps) => {
  return (
    <>
      <div
        className="target-entity-accordion__title"
      >
        {titleText}
      </div>
    </>
  );
};

export default TargetEntityAccordionTitle;