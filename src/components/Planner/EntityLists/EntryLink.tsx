import { useRef } from "react";
import { Link } from "react-router-dom";
import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../../../types-queries/helpers";
import { EntityClass, ENTITY_CLASS_TO_PLANNER_LINK, TierFilter } from "../../../utils/constants";
import { CartAction, TeamAction } from "../../App";
import PlannerItemIcon from "./PlannerItemIcon";

type EntryLinkProps = {
  hover: boolean
  parentEntityClass: EntityClass
  targetEntityClass: EntityClass | 'From search'
  linkName: string
  name: string
  icons?: {
    pokemonIconData: PokemonIconDatum[]
    itemIconDatum?: ItemIconDatum
    dispatchCart: React.Dispatch<CartAction>
    dispatchTeam: React.Dispatch<TeamAction>
    gen: GenerationNum
    tierFilter: TierFilter
    cartNote: string
  }
}

const EntryLink = ({
  hover,
  parentEntityClass,
  targetEntityClass,
  linkName,
  name,
  icons,
}: EntryLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  console.log(hover);

  const addItemToCart = (itemIconDatum: ItemIconDatum | undefined) => {
    if (!itemIconDatum) return;
    
    icons?.dispatchCart({
      type: 'add_item',
      payload: {
        item: itemIconDatum,
        requiredPokemon: icons?.pokemonIconData,
        parentEntityClass: parentEntityClass,
        targetEntityClass: targetEntityClass,
        note: icons.cartNote,
      },
    })
  }

  return (
    <div className="planner__entry-row-name-container">
      <Link
        ref={linkRef}
        to={`../${ENTITY_CLASS_TO_PLANNER_LINK.get(parentEntityClass)}/${linkName}`}
      >
        {<span
          className="planner__entry-row-name"
          style={{
            transform: hover ? "scale(1.05)" : "",
            transition: "transform 0.1s",
          }}
        >
          {name}
        </span>}
      </Link>
      <br />
      {icons?.itemIconDatum && 
      <>
          <PlannerItemIcon
            dispatchCart={icons.dispatchCart}
            dispatchTeam={icons.dispatchTeam}
            key={name}
            itemIconDatum={icons.itemIconDatum}
          />
          <button
            onClick={() => addItemToCart(icons.itemIconDatum)}
          >
            Add
          </button>
      </>}
    </div>
  )
}

export default EntryLink;