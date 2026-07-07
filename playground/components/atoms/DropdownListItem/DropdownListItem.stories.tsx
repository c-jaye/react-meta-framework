import type { Meta } from "@storybook/react-vite"
import { generateStateStory } from "~/util/storyTools"
import { unit } from "~/assets/scss"
import { useState } from "react"

import DropdownListItem from "."

const meta: Meta<typeof DropdownListItem> = {
    title: "Components/Atoms/DropdownListItem",
    component: DropdownListItem,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        label: "Dropdown List Item",
        value: "",
    },
    render: (args) => {
        const [value, setValue] = useState("")

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
                <DropdownListItem
                    {...args}
                    value="1"
                    label={`${args.label} 1`}
                    selected={value === "1"}
                    onClick={() => setValue("1")}
                />
                <DropdownListItem
                    {...args}
                    value="2"
                    label={`${args.label} 2`}
                    selected={value === "2"}
                    onClick={() => setValue("2")}
                />
                <DropdownListItem
                    {...args}
                    value="3"
                    label={`${args.label} 3`}
                    selected={value === "3"}
                    onClick={() => setValue("3")}
                />
            </div>
        )
    },
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
