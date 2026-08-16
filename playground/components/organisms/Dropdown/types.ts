import type { JSONPrimitive, LabelValue } from "@cjaye/utils"
import type { BaseProps } from "@/types"
import { DEFAULT_COMPONENT_STATE } from "@/const/state"
import type { DropdownListItemProps } from "~/components/DropdownListItem"

export const DROPDOWN_STATE = {
    ...DEFAULT_COMPONENT_STATE,
}

export interface DropdownProps<T extends JSONPrimitive = JSONPrimitive> extends BaseProps<"div", never, typeof DROPDOWN_STATE> {
    items?: DropdownListItemProps<T>[]
    value?: T | null
    onSelection?: (item: LabelValue<T> | null) => void
}
