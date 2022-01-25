import { useRef } from "react";
import { Link } from "react-router-dom";
import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../../../types-queries/helpers";
import { EntityClass, ENTITYCLASS_TO_PLANNERLINK, } from "../../../utils/constants";
import { TierFilter } from "../../../utils/smogonLogic";
import { CartAction, TeamAction } from "../../App";
import { EntryIconData } from "./helpers";
import PlannerItemIcon from "./PlannerItemIcon";
import PlannerTypeIcon from "./PlannerTypeIcon";

type EntryLinkProps = {
  hover: boolean
  parentEntityClass: EntityClass
  targetEntityClass: EntityClass | 'From search'
  linkName: string
  name: string
  icons?: EntryIconData
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
        to={`../${ENTITYCLASS_TO_PLANNERLINK.get(parentEntityClass)}/${linkName}`}
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
      {icons?.itemIconDatum
        ? <>
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
          </>
        : icons?.typeIconDatum 
          ? <>
              <PlannerTypeIcon
                dispatchCart={icons.dispatchCart}
                dispatchTeam={icons.dispatchTeam}
                key={name}
                typeIconData={{
                  type: icons.typeIconDatum,
                  gen: icons.gen,
                }}
              />
            </>
          : ''
      }
    </div>
  )
}

export default EntryLink;