import { GenNum } from "../../../../../types-queries/entities";
import { MemberPokemon } from "../../../../../types-queries/Member/MemberPokemon";
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
        title="Select nickname."
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
        title="Select level."
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
        title="Select gender."
        content={<>{member.gender}</>}

        interactive={true}

        gen={gen}
        minGen={2}
      />

      {/* Shiny */}
      <MemberDetailBox
        forClass="shiny"
        header="Shiny"
        title={member.shiny
          ? "Turn off shiny."
          : "Turn on shiny."
        }
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
        title="Select happiness level."
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