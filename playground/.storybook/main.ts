/* eslint-disable import-x/no-nodejs-modules */

import type { InlineConfig } from "vite"
import breakpoints from "@cjaye/react-meta-framework/addons/breakpoints"
import { defineMain } from "@storybook/react-vite/node"
import dotenv from "dotenv"
import { mergeConfig } from "vite"
import { resolve } from "path"
import state from "@cjaye/react-meta-framework/addons/state"
import tokenGenerator from "../../src/plugins/tokenGenerator"

const config = defineMain({
    stories: [
        "../**/*.stories.@(ts|tsx)",
    ],
    addons: [
        "@storybook/addon-vitest",
        "@storybook/addon-designs",
        "@storybook/addon-a11y",
        "@chromatic-com/storybook",
        ...(process.env.npm_lifecycle_event === "dev:storybook"
            ? [import.meta.resolve("./localPreset.ts")]
            : [state, breakpoints]
        ),
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {
            strictMode: true,
        },
    },
    core: {
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
        enableCrashReports: false,
    },
    typescript: {
        reactDocgen: "react-docgen-typescript",
    },
    viteFinal: (config) => {
        dotenv.config()
        return mergeConfig(config, {
            resolve: {
                tsconfigPaths: true,
            },
            plugins: [
                tokenGenerator(
                    resolve(import.meta.dirname, "../assets/scss.ts"),
                    resolve(import.meta.dirname, "../assets/scss/tokens"),
                ),
            ],
            optimizeDeps: {
                exclude: ["ast-types", "fs", "fs/promises"],
                include: ["react", "react-dom", "classnames"],
            },
            define: {
                "process.env": process.env,
            },
        } satisfies InlineConfig)
    },
})

export default config
