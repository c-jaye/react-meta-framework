/* eslint-disable import-x/no-nodejs-modules */

import { buildTokens } from "../src/util/generation"
import { resolve } from "path"
import { writeFile } from "fs/promises"

void buildTokens(
    writeFile,
    resolve(import.meta.dirname, "../playground/assets/scss.ts"),
    resolve(import.meta.dirname, "../playground/assets/scss/tokens"),
)
