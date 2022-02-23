import { useEffect, useState } from "react";
import { Team } from "../../../../hooks/App/Team";
import { MemberPokemon } from "../../../../types-queries/Builder/MemberPokemon";
import { DUMMY_POKEMON_ICON_DATUM, toTypeName } from "../../../../types-queries/helpers";
import { Dispatches, Filters } from "../../../App";
import NumericalInput from "../../../Reusables/NumericalInput/NumericalInput";
import Slider from "../../../Reusables/Slider/Slider";
import TextInput from "../../../Reusables/TextInput/TextInput";
import ItemIcon from "../../Icons/ItemIcon";
import PokemonIcon from "../../Icons/PokemonIcon";
import TypeIcon from "../../Icons/TypeIcon";
import { MemberDetailHandlers, ReferencePanelView } from "../TeamView";

import './MemberDetails.css';
import MoveSlot from "./MoveSlot";

type MemberDetailsProps = {
  dispatches: Dispatches
  filters: Filters
  handlers: MemberDetailHandlers
  team: Team
  memberSlot: number | null
  view: ReferencePanelView
};

const MemberDetails = ({
  dispatches,
  filters,
  handlers,
  team,
  memberSlot,
  view,
}: MemberDetailsProps) => {
  const member = memberSlot !== null
    ? team[filters.genFilter.gen].members[memberSlot]
    : null;

  if (member === null || memberSlot === null) return (
    <div className="member-details__wrapper member-details__wrapper--inactive" />
  );

  return (
    <div className="member-details__wrapper">
      {/* Icon, cosmetic form select */}
      <div className="member-details__cosmetic-wrapper">
        <div className="member-details__header">
          Pokemon name
        </div>
        <div className="member-details__content">
          <div className="member-details__icon-options-wrapper">
            <div className="member-details__icon-wrapper">
              <PokemonIcon
                pokemonIconDatum={member
                  ? member.iconDatum
                  : DUMMY_POKEMON_ICON_DATUM
                }
              />
            </div>
            <div className="member-details__cosmetic">
              Cosmetic forms
            </div>
          </div>
        </div>
      </div>

      {/* Extras */}
      <div className="member-details__extra-wrapper">
        <div className="member-details__nickname">
          <div className="member-details__header">
            Nickname
          </div>
          <div className="member-details__content">
            <TextInput
              title="Give this Pokemon a nickname"
              placeholder="Nickname"
              value={member?.nickname || ''}
              onChange={handlers.updateNickname}
              width={15}
              autoFocus={false}
            />
          </div>
        </div>
        <div className="member-details__level">
          <div className="member-details__header">
            Level
          </div>
          <div className="member-details__content">
            {member && <Slider
              titleFor="Level"

              min={0}
              max={100}
              value={member.level}
              updateValue={handlers.updateLevel}

              sliderWidth="50%"
              numericalWidth={3}
            />}
          </div>
        </div>
        <div className="member-details__gender">
          <div className="member-details__header">
            Gender
          </div>
          <div className="member-details__content">
            Yo
          </div>
        </div>
        <div className="member-details__shiny">
          <div className="member-details__header">
            Shiny
          </div>
          <div className="member-details__content">
          </div>
        </div>
        <div className="member-details__happiness">
          <div className="member-details__header">
            Happiness
          </div>
          <div className="member-details__content">
            {![1, 8].includes(filters.genFilter.gen) 
              ? <Slider
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
                />
              : `N/A`
            }
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="member-details__main-wrapper">
        <div className="member-details__moveset">
          <div className="member-details__header">
            Moveset
          </div>
          <div className="member-details__content">
            <div className="member-details__moveset-wrapper">
              <MoveSlot
                view={view}
                idx={0}
                clickHandlers={handlers}
                member={member}
              />
              <MoveSlot
                view={view}
                idx={1}
                clickHandlers={handlers}
                member={member}
              />
              <MoveSlot
                view={view}
                idx={2}
                clickHandlers={handlers}
                member={member}
              />
              <MoveSlot
                view={view}
                idx={3}
                clickHandlers={handlers}
                member={member}
              />
            </div>
          </div>
        </div>
        <div className="member-details__ability">
          <div className="member-details__header">
            Ability
          </div>
          <div
            className={`
              member-details__content
              ${view?.mode === 'ABILITY'
                ? 'member-details__content--active'
                : ''
              }
            `}
            onClick={handlers.onAbilityClick}
          >
            {member?.ability?.formattedName}
          </div>
        </div>
        <div className="member-details__item">
          <div className="member-details__header">
            Item
          </div>
          <div
            className={`
            member-details__content
            ${view?.mode === 'ITEM'
              ? 'member-details__content--active'
              : ''
            }
          `}
            onClick={handlers.onItemClick}
          >
            <div className="member-details__item-icon">
              {member?.item && <ItemIcon
                itemIconDatum={member.item}
              />}
            </div>
            <div className="member-details__item-name">
              {member?.item?.formattedName}
            </div>
          </div>
        </div>
        <div className="member-details__stats">
          <div className="member-details__header">
            Stats
          </div>
          <div
            className={`
            member-details__content
            ${view?.mode === 'STATS'
              ? 'member-details__content--active'
              : ''
            }
          `}
            onClick={handlers.onStatsClick}
          >
            Stat button
          </div>
        </div>
      </div>
    </div>
  )
};

export default MemberDetails;