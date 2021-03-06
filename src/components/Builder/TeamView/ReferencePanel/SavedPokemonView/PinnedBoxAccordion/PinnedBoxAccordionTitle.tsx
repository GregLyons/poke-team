import Button from "../../../../../Reusables/Button/Button";
import { SavedPokemonClickHandlers } from "../../../TeamView";

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
      <h2 className="pinned-box-title__text">
        {titleText}
      </h2>
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