import './Pages.css';

type ConnectionAccordionTitleProps = {
  titleText: string
}

const ConnectionAccordionTitle = ({
  titleText,
}: ConnectionAccordionTitleProps) => {
  return (
    <>
      <h2
        className="planner-accordion__title"
      >
        {titleText}
      </h2>
    </>
  );
};

export default ConnectionAccordionTitle;