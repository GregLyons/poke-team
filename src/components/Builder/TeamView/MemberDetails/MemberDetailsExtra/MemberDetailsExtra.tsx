import { GenNum } from "../../../../../types-queries/entities";
import { MemberPokemon } from "../../../../../types-queries/Member/MemberPokemon";
import Slider from "../../../../Reusables/Slider/Slider";
import TextInput from "../../../../Reusables/TextInput/TextInput";
import ThreeToggle from "../../../../Reusables/ThreeToggle/ThreeToggle";
import { MemberDetailsHandlers } from "../../TeamView";
import MemberDetailBox from "../MemberDetailBox";
import './MemberDetailsExtra.css';


type MemberDetailsExtraProps = {
  nicknameRef: React.RefObject<HTMLDivElement>
  member: MemberPokemon
  handlers: MemberDetailsHandlers
  gen: GenNum
};

const MemberDetailsExtra = ({
  nicknameRef,
  member,
  handlers,
  gen,
}: MemberDetailsExtraProps) => {
  let unavailableGenders: (boolean | null)[] = [];
  // No males
  if (member.maleRate === 0) {
    unavailableGenders = unavailableGenders.concat(null);
  }
  // No females
  if (member.femaleRate === 0) {
    unavailableGenders = unavailableGenders.concat(true);
  }
  // Males or females present, so 'N' excluded
  if (member.maleRate > 0 || member.femaleRate > 0) {
    unavailableGenders = unavailableGenders.concat(false);
  }

  return (
    <div
      className="member-details__extra-wrapper"
    >
      {/* Nickname */}
      <label htmlFor="member_nickname" className="hidden-label">Nickname</label>
      <MemberDetailBox
        focusRef={nicknameRef}
        forClass="nickname"
        header="Nickname"
        title="Select nickname."
        content={<TextInput
          id="member_nickname"
          inputType="text"
          title="Give this Pokemon a nickname"
          placeholder="Nickname"
          value={member?.nickname || ''}
          onChange={handlers.updateNickname}
          width={15}
        />}

        interactive={false}
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

        interactive={false}
      />

      {/* Gender */}
      <MemberDetailBox
        forClass="gender"
        header="Gender"
        title="Select gender."
        content={<ThreeToggle
            label=""
            selection={member.gender === 'N'
              ? false
              : member.gender === 'M'
                ? null
                : true}
            setSelection={handlers.updateGender}

            buttonLabels={['M', 'F', 'N']}
            background={false}
            disabled={unavailableGenders}
          />}

        interactive={false}

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
        
        interactive={false}

        gen={gen}
        minGen={2}
        excludeGens={[8]}
      />
    </div>
  );
};

export default MemberDetailsExtra;