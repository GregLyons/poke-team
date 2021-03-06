import { useRef } from "react";
import { Link } from "react-router-dom";
import { EntityClass, ENTITYCLASS_TO_PLANNERLINK } from "../../../utils/constants";
import { EntryIconData } from "../helpers";
import PlannerIcon from "./Icons/PlannerIcon";

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

  return (
    <div className="planner__entry-row-name-container">
      <Link
        ref={linkRef}
        to={`../${ENTITYCLASS_TO_PLANNERLINK.get(targetEntityClass === 'From search' ? parentEntityClass : targetEntityClass)}/${linkName}`}
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
      {icons?.linkIconDatum
        ? <>
            <PlannerIcon
              key={name}
              linkIconDatum={icons.linkIconDatum}
            />
          </>
        : ''
      }
    </div>
  )
}

export default EntryLink;