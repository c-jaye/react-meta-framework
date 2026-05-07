import { fontFaceStyles, fontMetricsStyles, fontTypeStyles } from "@/util/type"
import type { FontMetricGridProps } from "./types"
import { LOREM_IPSUM } from "@/const/strings"
import classNames from "classnames"

import scss from "./font-metric-grid.module.scss"

export const FontMetricGrid = ({
    adjusted = true,
    padded = true,
    text = LOREM_IPSUM,

    fontSize = 64,
    letterSpacing = 0,
    lineHeight = 1,
    fontUnit = "var(--font-unit, var(--aspect-unit, 2lvh))",

    fontFamily = "Open Sans",
    fontWeight = "600",
    fontStyle = "normal",

    ascent = 106.884766,
    capHeight = 71.386719,
    exHeight = 53.515625,
    descent = 29.296875,
    lineGap = 0,
    size = 100,

    showMetrics = true,
    showBackground = true,
    showAscent = false,
    showCapHeight = true,
    showExHeight = true,
    showBaseline = true,
    showDescent = false,

    className,
    ...props
}: FontMetricGridProps) => {
    const faceStyles = fontFaceStyles({ fontFamily, fontWeight, fontStyle })
    const metricStyles = fontMetricsStyles({ ascent, capHeight, exHeight, descent, lineGap, size })
    const typeStyles = fontTypeStyles({ fontSize, letterSpacing, lineHeight, fontUnit })

    return (
        <div
            {...props}
            className={classNames(
                scss.fontMetricGrid,
                { [scss.unpadded]: !padded || !adjusted },
                className,
            )}
            style={{
                ...faceStyles,
                ...metricStyles,
                ...typeStyles,
            }}
        >
            <div className={scss.lines}>
                {showMetrics && showBackground && <div className={scss.background} />}
                {showMetrics && showAscent && <div className={scss.ascent} />}
                {showMetrics && showCapHeight && <div className={scss.cap} />}
                {showMetrics && showExHeight && <div className={scss.ex} />}
                {showMetrics && showBaseline && <div className={scss.baseline} />}
                {showMetrics && showDescent && <div className={scss.descent} />}
            </div>
            <p className={classNames("prose", {
                legacy: !adjusted,
                unpadded: !padded || !adjusted,
            }, scss.text)}
            >
                <span>{text}</span>
            </p>
        </div>
    )
}
