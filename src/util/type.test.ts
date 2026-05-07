import { describe, expect, it } from "vitest"
import { fontFaceStyles } from "./type"

describe("fontFaceStyles", () => {
    it("should return default styles when no data is provided", () => {
        const styles = fontFaceStyles()
        expect(styles).toEqual({
            "--font-family": "\"Open Sans\", sans-serif",
            "--font-weight": 600,
            "--font-style": "normal",
        })
    })
})
