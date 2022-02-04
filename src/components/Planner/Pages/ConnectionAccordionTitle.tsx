import './Pages.css';

type ConnectionAccordionTitleProps = {
  titleText: string
}

const ConnectionAccordionTitle = ({
  titleText,
}: ConnectionAccordionTitleProps) => {
  return (
    <>
      <div
        className="planner-accordion__title"
      >
        {titleText}
      </div>
    </>
  );
};

export default ConnectionAccordionTitle;