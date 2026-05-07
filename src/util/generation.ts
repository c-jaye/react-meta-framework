/* eslint-disable import-x/no-nodejs-modules */

import { type Obj, entriesOf } from "@cjaye/utils"
import type { Tokens } from "@/types"
import { buildScssMap } from "./scss"
import { writeFile } from "fs/promises"

export async function buildTokens(tokenFile: string, tokensDir: string, spaces = 4) {
    const module = await import(`${tokenFile}?v=${Date.now()}`) as { default: Tokens }

    const useSassMap = "@use \"sass:map\";\n\n"

    const files: string[] = []

    for (const [k, v] of entriesOf(module.default)) {
        const { file, data } = v as { file: string, data: Obj }
        const path = `${tokensDir}/_${file}.scss`
        const content = useSassMap + buildScssMap(data, k, spaces)
        await writeFile(path, content)
        files.push(content)
    }

    return files
}
