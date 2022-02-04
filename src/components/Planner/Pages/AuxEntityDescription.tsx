import './Pages.css';

type AuxEntityDescriptionProps = {
  description: string
}

const AuxEntityDescription = ({
  description,
}: AuxEntityDescriptionProps) => {
  return (
    <div className="planner-page__description">
      {description}
    </div>
  );
};

export default AuxEntityDescription;