/* eslint-disable import-x/no-nodejs-modules */

import { copyFile, mkdir, rm } from "fs/promises"
import { defineBuildConfig } from "unbuild"
import { exec } from "child_process"
import { glob } from "tinyglobby"
import { resolve } from "path"

export default defineBuildConfig([{
    failOnWarn: false,
    hooks: {
        async "build:done"() {
            const unnecessaryFiles = [
                ...await glob("dist/**/*.d.(c)?ts"),
                ...await glob("dist/types/**/*.*js"),
            ]
            for (const file of unnecessaryFiles) {
                await rm(file)
            }

            const scssFiles = await glob("src/assets/scss/**/*.scss")
            const assetRoot = "dist/scss"
            for (const file of scssFiles) {
                const targetPath = `${assetRoot}/${file.replace("src/assets/scss/", "")}`
                await mkdir(targetPath.split("/").slice(0, -1).join("/"), { recursive: true })
                await copyFile(file, targetPath)
            }

            exec("npx eslint dist --fix")
        },
    },
    alias: {
        "@": resolve(import.meta.dirname, "./src"),
    },
    entries: [{
        input: "src/addons/breakpoints/index.ts",
        name: "addons/breakpoints/index",
        declaration: true,
    }, {
        input: "src/addons/breakpoints/preview.tsx",
        name: "addons/breakpoints/preview",
        declaration: true,
    }, {
        input: "src/addons/breakpoints/manager.tsx",
        name: "addons/breakpoints/manager",
        declaration: true,
    }, {
        input: "src/addons/state/index.ts",
        name: "addons/state/index",
        declaration: true,
    }, {
        input: "src/addons/state/preview.tsx",
        name: "addons/state/preview",
        declaration: true,
    }, {
        input: "src/addons/state/manager.tsx",
        name: "addons/state/manager",
        declaration: true,
    }, {
        input: "src/index.ts",
        name: "index",
        declaration: true,
    }],
    outDir: "dist",
    externals: [
        "ast-types",
        "react",
        "react-dom",
        "@storybook/icons",
        "opentype.js",
        "sass",
        "stylus",
        "terser",
        "less",
        "vite",
    ],
    rollup: {
        esbuild: {
            jsx: "automatic",
        },
        emitCJS: true,
        inlineDependencies: true,
    },
    declaration: "compatible",
}])
