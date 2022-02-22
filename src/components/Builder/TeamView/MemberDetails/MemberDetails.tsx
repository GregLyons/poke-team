import { MemberPokemon } from "../../../../types-queries/Builder/MemberPokemon";
import { DUMMY_POKEMON_ICON_DATUM } from "../../../../types-queries/helpers";
import { Dispatches, Filters } from "../../../App";
import NumericalInput from "../../../Reusables/NumericalInput/NumericalInput";
import Slider from "../../../Reusables/Slider/Slider";
import PokemonIcon from "../../Icons/PokemonIcon";
import { MemberDetailClickHandlers, ReferencePanelView } from "../TeamView";

import './MemberDetails.css';

type MemberDetailsProps = {
  dispatches: Dispatches
  filters: Filters
  clickHandlers: MemberDetailClickHandlers
  member: MemberPokemon | null
  view: ReferencePanelView
};

const MemberDetails = ({
  dispatches,
  filters,
  clickHandlers,
  member,
  view,
}: MemberDetailsProps) => {
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
          </div>
        </div>
        <div className="member-details__level">
          <div className="member-details__header">
            Level
          </div>
          <div className="member-details__content">
            <Slider
              titleFor="Level"

              min={0}
              max={100}
              value={50}
              updateValue={() => {}}

              sliderWidth="50%"
              numericalWidth={3}
            />
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
                  value={125}
                  updateValue={() => {}}
                  
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
              <div
                className={`
                  member-details__move-wrapper
                  ${view?.mode === 'MOVE' && view?.idx === 0
                    ? 'member-details__move-wrapper--active'
                    : ''
                  }
                `}
                onClick={e => clickHandlers.onMoveClick(e, 0)}
              >
                1
              </div>
              <div
                className={`
                member-details__move-wrapper
                ${view?.mode === 'MOVE' && view?.idx === 1
                  ? 'member-details__move-wrapper--active'
                  : ''
                }
              `}
                onClick={e => clickHandlers.onMoveClick(e, 1)}
              >
                2
              </div>
              <div
                className={`
                member-details__move-wrapper
                ${view?.mode === 'MOVE' && view?.idx === 2
                  ? 'member-details__move-wrapper--active'
                  : ''
                }
              `}
                onClick={e => clickHandlers.onMoveClick(e, 2)}
              >
                3
              </div>
              <div
                className={`
                member-details__move-wrapper
                ${view?.mode === 'MOVE' && view?.idx === 3
                  ? 'member-details__move-wrapper--active'
                  : ''
                }
              `}
                onClick={e => clickHandlers.onMoveClick(e, 3)}
              >
                4
              </div>
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
            onClick={clickHandlers.onAbilityClick}
          >
            Ability button
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
            onClick={clickHandlers.onItemClick}
          >
            Item button
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
            onClick={clickHandlers.onStatsClick}
          >
            Stat button
          </div>
        </div>
      </div>
    </div>
  )
};

export default MemberDetails;