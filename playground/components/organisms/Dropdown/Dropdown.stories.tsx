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

export const Idle = generateStateStory(meta, "idle")
export const All = generateStateStory(meta, "all")
export const Selected = generateStateStory(meta, "selected")
export const Hover = generateStateStory(meta, "hover")
export const Active = generateStateStory(meta, "active")
export const Highlighted = generateStateStory(meta, "highlighted")
export const FocusNavigation = generateStateStory(meta, "focusNavigation")
export const FocusWithin = generateStateStory(meta, "focusWithin")
export const Focus = generateStateStory(meta, "focus")
export const Error = generateStateStory(meta, "error")
export const Pressed = generateStateStory(meta, "pressed")
export const Disabled = generateStateStory(meta, "disabled")
