import { Link, useMatch, useResolvedPath, } from "react-router-dom";
import Button from "../Button/Button";

type LinkButtonProps = {
  to: string
  title: string
  label: string
  end: boolean
}

const LinkButton = ({
  to,
  title,
  label,
  end,
} :LinkButtonProps ) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end });

  return (
    <Link
      to={to}
    >
      <Button
        title={title}
        label={label}
        active={match 
          ? true
          : false
        }
        onClick={e => e}
        disabled={false}
        immediate={false}
      />
    </Link>
  )
}

export default LinkButton;