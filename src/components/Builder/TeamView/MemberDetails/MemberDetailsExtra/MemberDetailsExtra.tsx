import { MemberPokemon } from "../../../../../types-queries/Builder/MemberPokemon";
import { GenerationNum } from "../../../../../types-queries/helpers";
import Slider from "../../../../Reusables/Slider/Slider";
import TextInput from "../../../../Reusables/TextInput/TextInput";
import { MemberDetailsHandlers } from "../../TeamView";
import MemberDetailBox from "../MemberDetailBox";

import './MemberDetailsExtra.css';

type MemberDetailsExtraProps = {
  member: MemberPokemon
  handlers: MemberDetailsHandlers
  gen: GenerationNum
};

const MemberDetailsExtra = ({
  member,
  handlers,
  gen,
}: MemberDetailsExtraProps) => {
  return (
    <div
      className="member-details__extra-wrapper"
    >
      {/* Nickname */}
      <MemberDetailBox
        forClass="nickname"
        header="Nickname"
        content={<TextInput
          title="Give this Pokemon a nickname"
          placeholder="Nickname"
          value={member?.nickname || ''}
          onChange={handlers.updateNickname}
          width={15}
          autoFocus={false}
        />}
      />
      
      {/* Level */}
      <MemberDetailBox
        forClass="level"
        header="Level"
        content={member && <Slider
          titleFor="Level"

          min={0}
          max={100}
          value={member.level}
          updateValue={handlers.updateLevel}

          sliderWidth="50%"
          numericalWidth={3}
        />}
      />

      {/* Gender */}
      <MemberDetailBox
        forClass="gender"
        header="Gender"
        content={<>{member.gender}</>}

        gen={gen}
        minGen={2}
      />

      {/* Shiny */}
      <MemberDetailBox
        forClass="shiny"
        header="Shiny"
        content={<>{member.shiny ? 'Yes' : 'No'}</>}

        onContentClick={handlers.toggleShiny}

        gen={gen}
        minGen={2}
      />

      {/* Happiness */}
      <MemberDetailBox
        forClass="happiness"
        header="Happiness"
        content={<Slider
          titleFor="Happiness"
          min={0}
          max={255}
          value={member?.happiness !== undefined
            ? member.happiness
            : 255
          }
          updateValue={handlers.updateHappiness}
          
          sliderWidth="50%"
          numericalWidth={3}
        />}

        gen={gen}
        minGen={2}
        excludeGens={[8]}
      />
    </div>
  );
};

export default MemberDetailsExtra;