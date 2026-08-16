import type { Preview } from "@storybook/react-vite"
import { StrictMode } from "react"
import { themes } from "../assets/scss"

import "../assets/scss/global.scss"

const preview: Preview = {
    parameters: {
        backgrounds: {
            options: {
                light: {
                    name: "Light",
                    value: themes.light.bgIdle,
                },
                dark: {
                    name: "Dark",
                    value: themes.dark.bgIdle,
                },
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "todo",
        },
        initialGlobals: {
            backgrounds: {
                value: "light",
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <StrictMode>
                    <div data-rms data-theme="dark">
                        <Story />
                    </div>
                </StrictMode>
            )
        },
    ],
}

export default preview
