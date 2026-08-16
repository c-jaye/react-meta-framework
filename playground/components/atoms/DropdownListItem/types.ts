import type { JSONPrimitive, LabelValue } from "@cjaye/utils"
import type { BaseProps } from "@/types"
import { DEFAULT_COMPONENT_STATE } from "@/const/state"

export const DROPDOWN_LIST_ITEM_STATE = {
    ...DEFAULT_COMPONENT_STATE,
}

export interface DropdownListItemProps<T extends JSONPrimitive = JSONPrimitive> extends BaseProps<"div", never, typeof DROPDOWN_LIST_ITEM_STATE> {
    value: T | null
    label: string
    selected?: boolean
    onSelection?: (value: LabelValue<T> | null) => void
}
