import FontAwesome from "react-fontawesome";

type ConnectionAccordionTitleProps = {
  titleText: string
}

const ConnectionAccordionTitle = ({
  titleText,
}: ConnectionAccordionTitleProps) => {
  return (
    <>
      <div
        className="planner-accordion__title-text"
      >
        {titleText}
      </div>
    </>
  );
};

export default ConnectionAccordionTitle;