import type { Meta } from "@storybook/react-vite"
import { generateStateStory } from "~/util/storyTools"
import { unit } from "~/assets/scss"

import DropdownList from "."

const meta: Meta<typeof DropdownList> = {
    title: "Components/Molecules/DropdownList",
    component: DropdownList,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        items: [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
            { label: "Option 4", value: "4" },
            { label: "Option 5", value: "5" },
        ],
        value: "2",
        stateForce: { active: true },
    },
    render: args => (
        <div style={{
            overflow: "visible",
            display: "grid",
            gridAutoFlow: "column",
            placeItems: "start",
            gap: unit(4),
            padding: unit(6),
        }}
        >
            <DropdownList {...args} />
            <DropdownList {...args} data-theme="light" />
        </div>
    ),
}

export default meta

export const All = generateStateStory(meta, { states: ["all"], copies: 3 })
export const Idle = generateStateStory(meta, { states: ["idle"], copies: 3 })
export const Selected = generateStateStory(meta, { states: ["selected"], copies: 3 })
export const Hover = generateStateStory(meta, { states: ["hover"], copies: 3 })
export const Active = generateStateStory(meta, { states: ["active"], copies: 3 })
export const Highlighted = generateStateStory(meta, { states: ["highlighted"], copies: 3 })
export const FocusNavigation = generateStateStory(meta, { states: ["focusNavigation"], copies: 3 })
export const FocusWithin = generateStateStory(meta, { states: ["focusWithin"], copies: 3 })
export const Focus = generateStateStory(meta, { states: ["focus"], copies: 3 })
export const Error = generateStateStory(meta, { states: ["error"], copies: 3 })
export const Pressed = generateStateStory(meta, { states: ["pressed"], copies: 3 })
export const Disabled = generateStateStory(meta, { states: ["disabled"], copies: 3 })
