import type { LabelValue, Obj } from "@cjaye/utils"
import { calculateMetrics, installFontFace, measureText, opentypeMetrics } from "@/util/type"
import { fetchAny, fetchJson, toUrlParams } from "@cjaye/utils"
import { useCallback, useRef, useState } from "react"
import { FONT_TEST_CHARACTERS } from "@/const/strings"
import type { FullMetrics } from "@/types/type"

export interface UseWebFontsOptions {
    onLoadOptions?: (options: {
        familyOptions: LabelValue<string>[]
        weightOptions: Obj<LabelValue<string>[]>
    }) => void
    onLoadMetrics?: (metrics: FullMetrics) => void
}

export function useWebFonts(options?: UseWebFontsOptions) {
    const {
        onLoadOptions,
        onLoadMetrics,
    } = options ?? {}

    const [familyOptions, setFamilyOptions] = useState<LabelValue<string>[]>([])
    const [weightOptions, setWeightOptions] = useState<Obj<LabelValue<string>[]>>({})
    const [metrics, setMetrics] = useState<Obj<Obj<FullMetrics>>>({})

    const loadOptions = useCallback(async () => {
        const params = toUrlParams({ key: process.env.WEBFONTS_API_KEY })
        const url = `https://www.googleapis.com/webfonts/v1/webfonts${params}`
        const response = await fetchJson("GET", url)
        const json = await response.json() as {
            items: { family: string, variants: string[], files: Obj<string> }[]
        }

        const familyOptions = json.items
            .filter(x => x.variants.some(y => parseInt(y).toString() === y))
            .map(x => ({ label: x.family, value: x.family }))

        const weightOptions = json.items
            .reduce((v, x) => {
                v[x.family] = x.variants
                    .filter(y => parseInt(y).toString() === y)
                    .map(y => ({ label: y, value: `${x.files[y]}` }))
                return v
            }, {} as Obj<LabelValue<string>[]>)

        setFamilyOptions(familyOptions)
        setWeightOptions(weightOptions)
        onLoadOptions?.({ familyOptions, weightOptions })

        return {
            familyOptions,
            weightOptions,
        }
    }, [onLoadOptions])

    const isLoading = useRef(false)

    const loadFont = useCallback(async (
        family: string,
        weight: string,
        url: string,
    ) => {
        if (!!metrics[family]?.[weight]) {
            onLoadMetrics?.(metrics[family][weight])
            return metrics[family][weight]
        }
        if (isLoading.current) return

        isLoading.current = true

        const res = await fetchAny("GET", url)
        const buffer = await res.arrayBuffer()
        const fontFace = await installFontFace(buffer, family, weight)
        const canvasOptions = {
            fontFamily: family,
            fontWeight: weight,
            fontStyle: "normal",
            fontSize: 1,
        }
        const canvasMixed = measureText(FONT_TEST_CHARACTERS, canvasOptions)
        const canvasCap = measureText("X", canvasOptions)
        const canvasEx = measureText("x", canvasOptions)
        const opentype = opentypeMetrics(buffer)
        const final = calculateMetrics(opentype, 100)

        const newMetrics: FullMetrics = {
            family,
            weight,
            canvasMixed,
            canvasCap,
            canvasEx,
            fontFace,
            opentype,
            final,
        }

        setMetrics(prev => ({
            ...prev,
            [family]: {
                ...prev[family],
                [weight]: newMetrics,
            },
        }))

        onLoadMetrics?.(newMetrics)

        isLoading.current = false

        return newMetrics
    }, [metrics, onLoadMetrics])

    return {
        loadOptions,
        loadFont,
        familyOptions,
        weightOptions,
        metrics,
    }
}
