import type { Meta } from "@storybook/react-vite"
import { generateStateStory } from "~/util/storyTools"
import { unit } from "~/assets/scss"

import TestCard from "."

const meta: Meta<typeof TestCard> = {
    title: "Components/Molecules/TestCard",
    component: TestCard,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        title: "Spaces Flex",
        caption: "KITCHEN, BATHROOM",
        description: "Achieve your full creative and business potential with Spaces Flex. From inspiring designs to efficient project quotation, transform every aspect of your customer journey.",
        imgSrc: "https://www.cyncly.com/siteassets/assets/cyncly/homepage/bath-showroom.jpg",
        logoSrc: "https://www.cyncly.com/siteassets/assets/cyncly/homepage/spacesflex-icon-1.png",
        buttons: [
            { variant: "primary", label: "Request a demo", to: "https://spaces.cyncly.com/spaces-flex-demo.html" },
            { variant: "tertiary", label: "Product details", to: "https://www.cyncly.com/products/spaces-flex" },
        ],
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
            <TestCard {...args} />
            <TestCard {...args} />
            <TestCard {...args} />
        </div>
    ),
}

export default meta

export const Idle = generateStateStory(meta, { states: ["idle"] })
export const All = generateStateStory(meta, { states: ["all"] })
export const Selected = generateStateStory(meta, { states: ["selected"] })
export const Hover = generateStateStory(meta, { states: ["hover"] })
export const Active = generateStateStory(meta, { states: ["active"] })
export const Highlighted = generateStateStory(meta, { states: ["highlighted"] })
export const FocusNavigation = generateStateStory(meta, { states: ["focusNavigation"] })
export const FocusWithin = generateStateStory(meta, { states: ["focusWithin"] })
export const Focus = generateStateStory(meta, { states: ["focus"] })
export const Error = generateStateStory(meta, { states: ["error"] })
export const Pressed = generateStateStory(meta, { states: ["pressed"] })
export const Disabled = generateStateStory(meta, { states: ["disabled"] })
