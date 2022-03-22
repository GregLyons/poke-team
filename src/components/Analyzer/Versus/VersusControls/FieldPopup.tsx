import { Field } from "@smogon/calc";
import { Terrain, Weather } from "@smogon/calc/dist/data/interface";
import { GenNum } from "../../../../types-queries/entities";
import Button from "../../../Reusables/Button/Button";
import Popup from "../../../Reusables/Popup/Popup";
import { TERRAINS_GENS, WEATHERS_GENS } from "../helpers";

type FieldPopupProps = {
  gen: GenNum
  field: Field
  setField: React.Dispatch<React.SetStateAction<Field>>
};

const FieldPopup = ({
  gen,
  field,
  setField,
}: FieldPopupProps) => {

  const setTerrain = (terrain: Terrain) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (!field) return;

    const currentTerrain = field.terrain;
    let newTerrain: Terrain | undefined;
    if (terrain === currentTerrain) {
      newTerrain = undefined;
    }
    else {
      newTerrain = terrain;
    }

    setField(new Field({
      ...field,
      terrain: newTerrain,
    }));
  };

  const setWeather = (weather: Weather) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (!field) return;

    const currentWeather = field.weather;
    let newWeather: Weather | undefined;
    if (weather === currentWeather) {
      newWeather = undefined;
    }
    else {
      newWeather = weather;
    }

    setField(new Field({
      ...field,
      weather: newWeather,
    }));
  };

  const toggleGravity = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (!field) return;

    setField(new Field({
      ...field,
      isGravity: !field.isGravity,
    }))
  };
  return (<>
    <label htmlFor="popup_trigger_field" className="hidden-label"></label>
    <Popup
      triggerID={"popup_trigger_field"}
      trigger={<div title="Change conditions of the entire field.">FIELD</div>}
      content={<fieldset className="versus-controls__field">
        <legend className="hidden-label">Conditions on the field</legend>
        <h3>Weather</h3>
        <div className="versus-controls__weather">
          {WEATHERS_GENS.map(weatherAndGen => {
            const [weather, weatherGen] = weatherAndGen;

            let label: string = weather;
            if (weather === 'Harsh Sunshine') {
              label = 'XSun';
            }
            else if (weather === 'Heavy Rain') {
              label = 'XRain';
            }
            else if (weather === 'Strong Winds') {
              label = 'Winds';
            }

            const active = field?.weather === weather;

            return <Button
              key={weather}
              title={active
                ? `Turn off ${weather}.` 
                : `Turn on ${weather}.`
              }
              label={label}

              onClick={setWeather(weather)}
              active={active}
              disabled={weatherGen > gen}
              immediate={false}
            />
          })}     
        </div>
        <h3>Terrain</h3>
        <div className="versus-controls__terrain">
          {TERRAINS_GENS.map(terrainAndGen => {
            const [terrain, terrainGen] = terrainAndGen;

            const active = field?.terrain === terrain;

            return <Button
              key={terrain}
              title={active
                ? `Turn off ${terrain} terrain.` 
                : `Turn on ${terrain} terrain.`
              }
              label={terrain}

              onClick={setTerrain(terrain)}
              active={active}
              disabled={terrainGen > gen}
              immediate={false}
            />
          })}
        </div>
        <h3>Gravity</h3>
        <div className="versus-controls__gravity">
          <Button
            title={field?.isGravity
              ? `Turn off Gravity.` 
              : `Turn on Gravity.`
            }
            label="Gravity"

            onClick={toggleGravity}
            active={field?.isGravity ? true : false}
            disabled={4 > gen}
            immediate={false}
          />
        </div>
      </fieldset>}
      orientation="bottom"
    />
  </>);
};

export default FieldPopup;