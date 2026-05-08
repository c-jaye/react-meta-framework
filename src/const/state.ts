import type { ComponentState } from "@/types"

export const STATE_ADDON_ID = "react-meta-framework-state"
export const STATE_TOOL_ID = `${STATE_ADDON_ID}/tool`
export const STATE_PANEL_ID = `${STATE_ADDON_ID}/panel`
export const STATE_TAB_ID = `${STATE_ADDON_ID}/tab`

export const BREAKPOINT_ADDON_ID = "react-meta-framework-breakpoints"
export const BREAKPOINT_TOOL_ID = `${BREAKPOINT_ADDON_ID}/tool`
export const BREAKPOINT_PANEL_ID = `${BREAKPOINT_ADDON_ID}/panel`
export const BREAKPOINT_PARAM_ID = `${BREAKPOINT_ADDON_ID}/param`
export const BREAKPOINT_ELEMENT_ID = `${BREAKPOINT_ADDON_ID}/element`

export const DEFAULT_COMPONENT_STATE = {
    selected: false,
    hover: false,
    active: false,
    highlighted: false,
    focusWithin: false,
    focus: false,
    pressed: false,
    disabled: false,
} as const satisfies ComponentState

export const THEME = {
    Light: "light",
    Dark: "dark",
    Cyncly: "cyncly",
} as const
