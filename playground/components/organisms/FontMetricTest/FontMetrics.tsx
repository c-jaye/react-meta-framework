import { useEffect, useState } from "react"
import type { FontMetricsProps } from "./types"
import { LOREM_IPSUM } from "@/const/strings"
import classNames from "classnames"
import { useWebFonts } from "~/hooks/useWebFonts"

import Dropdown from "~/components/Dropdown"
import FontMetricGrid from "~/components/FontMetricsGrid"

import scss from "./font-metrics.module.scss"

export const FontMetrics = ({
    adjusted = true,
    padded = true,
    text = LOREM_IPSUM,

    fontSize = 64,
    letterSpacing = 0,
    lineHeight = 1,
    fontUnit = "var(--font-unit, var(--aspect-unit, 2lvh))",

    fontFamily: _fontFamily = "Open Sans",
    fontWeight: _fontWeight = "600",
    fontStyle = "normal",

    ascent: _ascent = 106.884766,
    capHeight: _capHeight = 71.386719,
    exHeight: _exHeight = 53.515625,
    descent: _descent = 29.296875,
    lineGap: _lineGap = 0,
    size: _size = 100,

    showMetrics = true,
    showBackground = true,
    showAscent = false,
    showCapHeight = true,
    showExHeight = true,
    showBaseline = true,
    showDescent = false,

    className,
    ...props
}: FontMetricsProps) => {
    const [fontFamily, setFontFamily] = useState<string>(_fontFamily)
    const [fontWeight, setFontWeight] = useState<string>(_fontWeight)

    const [ascent, setAscent] = useState<number>(_ascent)
    const [capHeight, setCapHeight] = useState<number>(_capHeight)
    const [exHeight, setExHeight] = useState<number>(_exHeight)
    const [descent, setDescent] = useState<number>(_descent)
    const [lineGap, setLineGap] = useState<number>(_lineGap)
    const [size, setSize] = useState<number>(_size)

    const {
        familyOptions,
        weightOptions,
        loadOptions,
        loadFont,
    } = useWebFonts({
        onLoadMetrics: ({ final }) => {
            setAscent(final.ascent)
            setCapHeight(final.capHeight)
            setExHeight(final.exHeight)
            setDescent(final.descent)
            setLineGap(final.lineGap)
            setSize(final.size)
        },
    })

    useEffect(() => {
        void (async () => {
            const { weightOptions } = await loadOptions()
            await loadFont(
                fontFamily,
                fontWeight,
                weightOptions[fontFamily].find(w => w.label === fontWeight)?.value ?? "",
            )
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            {...props}
            className={classNames(scss.fontMetrics, className)}
        >
            <div className={scss.gridH}>
                <Dropdown
                    value={fontFamily}
                    items={familyOptions}
                    onSelection={(v) => {
                        if (!v) return
                        const weight = weightOptions[v.value].find(x => x.label === fontWeight)
                            ? fontWeight
                            : weightOptions[v.value][0]?.label ?? null
                        setFontFamily(v.value)
                        setFontWeight(weight)
                        if (!weight || !weightOptions?.[v.value ?? ""]?.[0]?.value) return
                        void loadFont(v.value, weight, weightOptions[v.value][0].value)
                    }}
                />
                <Dropdown
                    value={weightOptions?.[fontFamily ?? ""]?.find(w => w.label === fontWeight)?.value ?? null}
                    items={weightOptions?.[fontFamily ?? ""] ?? []}
                    onSelection={(v) => {
                        if (!v || !fontFamily) return
                        setFontWeight(v.label ?? null)
                        void loadFont(fontFamily, v.label, v.value)
                    }}
                />
            </div>
            <div className={scss.gridH}>
                <div className="rmf-prose"><label>Ascent</label></div>
                <div className="rmf-prose"><input type="number" value={ascent} onInput={e => setAscent(parseFloat(e.currentTarget.value))} /></div>
            </div>
            <div className={scss.gridH}>
                <div className="rmf-prose"><label>Cap Height</label></div>
                <div className="rmf-prose"><input type="number" value={capHeight} onInput={e => setCapHeight(parseFloat(e.currentTarget.value))} /></div>
            </div>
            <div className={scss.gridH}>
                <div className="rmf-prose"><label>Ex Height</label></div>
                <div className="rmf-prose"><input type="number" value={exHeight} onInput={e => setExHeight(parseFloat(e.currentTarget.value))} /></div>
            </div>
            <div className={scss.gridH}>
                <div className="rmf-prose"><label>Descent</label></div>
                <div className="rmf-prose"><input type="number" value={descent} onInput={e => setDescent(parseFloat(e.currentTarget.value))} /></div>
            </div>
            <div className={scss.gridH}>
                <div className="rmf-prose"><label>Line Gap</label></div>
                <div className="rmf-prose"><input type="number" value={lineGap} onInput={e => setLineGap(parseFloat(e.currentTarget.value))} /></div>
            </div>
            <div className={scss.gridH}>
                <div className="rmf-prose"><label>Size</label></div>
                <div className="rmf-prose"><input type="number" value={size} onInput={e => setSize(parseFloat(e.currentTarget.value))} /></div>
            </div>
            <FontMetricGrid
                adjusted={adjusted}
                padded={padded}
                text={text}

                fontSize={fontSize}
                letterSpacing={letterSpacing}
                lineHeight={lineHeight}
                fontUnit={fontUnit}

                fontFamily={fontFamily}
                fontWeight={fontWeight}
                fontStyle={fontStyle}

                ascent={ascent}
                capHeight={capHeight}
                exHeight={exHeight}
                descent={descent}
                lineGap={lineGap}
                size={size}

                showMetrics={showMetrics}
                showBackground={showBackground}
                showAscent={showAscent}
                showCapHeight={showCapHeight}
                showExHeight={showExHeight}
                showBaseline={showBaseline}
                showDescent={showDescent}
            />
            <FontMetricGrid
                adjusted={adjusted}
                padded={padded}
                text={text}

                fontSize={fontSize}
                letterSpacing={letterSpacing}
                lineHeight={lineHeight}
                fontUnit={fontUnit}

                fontFamily={fontFamily}
                fontWeight={fontWeight}
                fontStyle={fontStyle}

                ascent={ascent}
                capHeight={capHeight}
                exHeight={exHeight}
                descent={descent}
                lineGap={lineGap}
                size={size}

                showMetrics={showMetrics}
                showBackground={showBackground}
                showAscent={showAscent}
                showCapHeight={showCapHeight}
                showExHeight={showExHeight}
                showBaseline={showBaseline}
                showDescent={showDescent}
            />
        </div>
    )
}
