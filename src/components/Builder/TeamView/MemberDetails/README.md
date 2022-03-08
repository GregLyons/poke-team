# General structure

Each major section of the `MemberDetails` component has its own directory. The `MemberDetailBox` and `MemberDetailInnerBox` serve as wrapper components for styling purposes. For example, the box for selecting abilities, handled in `MemberDetailsMain`, is wrapped in a `MemberDetailBox`, which visually reacts in various ways to hovering, focusing, etc.

However, the Pokemon's moveset is wrapped in a static `MemberDetailBox`, with individual moves each being contained in a `MemberDetailInnerBox` component. In this case, the inner box should provide visual feedback (e.g. lighting up) to user interaction, but the outer box does not visually respond in this case (it's main purpose is to group the inner boxes visually).