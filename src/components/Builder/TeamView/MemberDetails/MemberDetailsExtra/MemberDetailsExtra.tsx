import { MemberPokemon } from "../../../../../types-queries/Builder/MemberPokemon";
import { GenNum } from "../../../../../types-queries/helpers";
import Slider from "../../../../Reusables/Slider/Slider";
import TextInput from "../../../../Reusables/TextInput/TextInput";
import { MemberDetailsHandlers } from "../../TeamView";
import MemberDetailBox from "../MemberDetailBox";

import './MemberDetailsExtra.css';

type MemberDetailsExtraProps = {
  member: MemberPokemon
  handlers: MemberDetailsHandlers
  gen: GenNum
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

        interactive={true}
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

        interactive={true}
      />

      {/* Gender */}
      <MemberDetailBox
        forClass="gender"
        header="Gender"
        content={<>{member.gender}</>}

        interactive={true}

        gen={gen}
        minGen={2}
      />

      {/* Shiny */}
      <MemberDetailBox
        forClass="shiny"
        header="Shiny"
        content={<>{member.shiny ? 'Yes' : 'No'}</>}

        onContentClick={handlers.toggleShiny}
        interactive={true}

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
        
        interactive={true}

        gen={gen}
        minGen={2}
        excludeGens={[8]}
      />
    </div>
  );
};

export default MemberDetailsExtra;