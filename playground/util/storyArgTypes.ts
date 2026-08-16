import type { FontFaceConfig, FontMetricsConfig, FontTypeConfig } from "@/types"
import type { Meta } from "@storybook/react-vite"

export const fontTypeArgTypes: Meta<FontTypeConfig>["argTypes"] = {
    fontSize: {
        control: "number",
        type: "number",
    },
    letterSpacing: {
        control: "number",
        type: "number",
    },
    lineHeight: {
        control: "number",
        type: "number",
    },
    fontUnit: {
        control: "select",
        type: "string",
        options: [
            "calc(var(--aspect-unit) * 0.2)",
            "1px",
            "0.1rem",
        ],
    },
}

export const fontFaceArgTypes: Meta<FontFaceConfig>["argTypes"] = {
    fontFamily: {
        control: "text",
        type: "string",
    },
    fontWeight: {
        control: "text",
        type: "string",
    },
    fontStyle: {
        control: "select",
        type: "string",
        options: [
            "normal",
            "italic",
            "oblique",
        ],
    },
}

export const fontMetricsArgTypes: Meta<FontMetricsConfig>["argTypes"] = {
    ascent: {
        control: "number",
        type: "number",
    },
    capHeight: {
        control: "number",
        type: "number",
    },
    exHeight: {
        control: "number",
        type: "number",
    },
    descent: {
        control: "number",
        type: "number",
    },
    lineGap: {
        control: "number",
        type: "number",
    },
    size: {
        control: "number",
        type: "number",
    },
}
