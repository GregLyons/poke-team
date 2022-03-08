# General structure

The `MemberDetails` component is where the user can modify individual team members. 

The `ReferencePanel` wraps several context-dependent components used for team-building. For example, when the user is adding Pokemon it displays the saved Pokemon, whereas when the user is modifying a Pokemon's move it displays the list of moves that that Pokemon knows, and so on.

Finally, the `TeamIcons` component consists of the icons of the Pokemon team members, and it provides add/remove functionality. 

The top-level `TeamView` component manages the interactions between these three components. For example, the `view` state is passed as props down to the `ReferencePanel` to determine what to display, and actions in the `MemberDetails` and `TeamIcons` component modify this state (`setView`) in various ways.