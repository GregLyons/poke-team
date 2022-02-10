import Button from "../../../Reusables/Button/Button";
import { PinnedBoxClickHandlers } from "../TeamView";

type PinnedBoxAccordionTitleProps = {
  titleText: string
  clickHandlers: PinnedBoxClickHandlers
}

const PinnedBoxAccordionTitle = ({
  titleText,
  clickHandlers,
}: PinnedBoxAccordionTitleProps) => {
  return (
    <>
      <div className="pinned-box-title__text">
        {titleText}
      </div>
      <div className="pinned-box-title__buttons">
        <Button
          title='Unpin this box'
          label='UNPIN'
          active={true}
          onClick={e => clickHandlers.onUnpinClick(e, titleText)}
          disabled={false}
          immediate={true}
        />
      </div>
    </>
  );
};

export default PinnedBoxAccordionTitle;