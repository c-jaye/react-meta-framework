import type { Meta } from "@storybook/react-vite"
import { generateStateStory } from "~/util/storyTools"
import { unit } from "~/assets/scss"

import Dropdown from "."

const meta: Meta<typeof Dropdown> = {
    title: "Components/Organisms/Dropdown",
    parameters: {
        layout: "fullscreen",
    },
    component: Dropdown,
    args: {
        items: [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
            { label: "Option 4", value: "4" },
            { label: "Option 5", value: "5" },
        ],
        value: "2",
    },
    render: (args) => {
        return (
            <div style={{
                overflow: "visible",
                display: "grid",
                gridAutoFlow: "column",
                placeItems: "start",
                gap: unit(4),
                padding: unit(6),
            }}
            >
                <Dropdown {...args} />
                <Dropdown {...args} data-theme="light" />
            </div>
        )
    },
}

export default meta

export const All = generateStateStory(meta, { states: ["all"], copies: 3, direction: "row" })
export const Idle = generateStateStory(meta, { states: ["idle"], copies: 3, direction: "row" })
export const Selected = generateStateStory(meta, { states: ["selected"], copies: 3, direction: "row" })
export const Hover = generateStateStory(meta, { states: ["hover"], copies: 3, direction: "row" })
export const Active = generateStateStory(meta, { states: ["active"], copies: 3, direction: "row" })
export const Highlighted = generateStateStory(meta, { states: ["highlighted"], copies: 3, direction: "row" })
export const FocusNavigation = generateStateStory(meta, { states: ["focusNavigation"], copies: 3, direction: "row" })
export const FocusWithin = generateStateStory(meta, { states: ["focusWithin"], copies: 3, direction: "row" })
export const Focus = generateStateStory(meta, { states: ["focus"], copies: 3, direction: "row" })
export const Error = generateStateStory(meta, { states: ["error"], copies: 3, direction: "row" })
export const Pressed = generateStateStory(meta, { states: ["pressed"], copies: 3, direction: "row" })
export const Disabled = generateStateStory(meta, { states: ["disabled"], copies: 3, direction: "row" })
