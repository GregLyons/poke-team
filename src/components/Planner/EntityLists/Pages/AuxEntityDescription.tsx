type AuxEntityDescriptionProps = {
  description: string
}

const AuxEntityDescription = ({
  description,
}: AuxEntityDescriptionProps) => {
  return (
    <div className="planner__page-description">
      {description}
    </div>
  );
};

export default AuxEntityDescription;