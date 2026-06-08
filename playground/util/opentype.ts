import { parse } from "opentype.js"

export function opentypeMetrics(buffer: ArrayBuffer) {
    return parse(buffer)
}
