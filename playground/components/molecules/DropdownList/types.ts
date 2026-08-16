import type { JSONPrimitive, LabelValue } from "@cjaye/utils"
import type { BaseProps } from "@/types"
import { DEFAULT_COMPONENT_STATE } from "@/const/state"
import type { DropdownListItemProps } from "~/components/DropdownListItem"

export const DROPDOWN_LIST_STATE = {
    ...DEFAULT_COMPONENT_STATE,
}

export interface DropdownListProps<T extends JSONPrimitive = JSONPrimitive> extends BaseProps<"div", "onChange", typeof DROPDOWN_LIST_STATE> {
    items?: DropdownListItemProps<T>[]
    value?: T | null
    onSelection?: (value: LabelValue<T> | null) => void
    onSearch?: (term: string) => void
}
