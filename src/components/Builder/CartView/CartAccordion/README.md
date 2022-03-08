# General structure

The `CartAccordion` is a multi-level accordion. The top levels consist of a 'Custom' section for custom boxes, as well as top-level groupings ('parent entities') from the Planner section ('Ability', 'Effect', 'Move',  etc.). For these latter groupings, there is a secondary level of `TargetEntityAccordion` components. 

For example, if a box comes from an Ability connection on the 'Rain' Field State page, say "'Drizzle' creates 'Rain'", then the top level will be 'Field State', the secondary level/target entity would be 'Ability' (the endpoint of the connection), and the bottom level would be the individual box. The 'Custom' section does not have this hierarchy.