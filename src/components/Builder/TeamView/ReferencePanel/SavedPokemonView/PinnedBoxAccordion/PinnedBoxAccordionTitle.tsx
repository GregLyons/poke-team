import Button from "../../../../../Reusables/Button/Button";
import { ReferencePanelClickHandlers, SavedPokemonClickHandlers } from "../../../TeamView";

type PinnedBoxAccordionTitleProps = {
  titleText: string
  clickHandlers?: SavedPokemonClickHandlers
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
          onClick={e => clickHandlers?.onUnpinClick(e, titleText)}
          // If no clickHandler is passed, then there will be an empty slot (this is for Quick Search Pokemon), giving consistent space/style with pinned boxes
          disabled={clickHandlers === undefined}
          immediate={true}
        />
      </div>
    </>
  );
};

export default PinnedBoxAccordionTitle;