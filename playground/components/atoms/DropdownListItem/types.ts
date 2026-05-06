import type { JSONPrimitive, LabelValue } from "@cjaye/utils"
import type { BaseProps } from "@/types"

export interface DropdownListItemProps<T extends JSONPrimitive = JSONPrimitive> extends BaseProps<"div", never, {}> {
    value: T | null
    label: string
    selected?: boolean
    onSelection?: (value: LabelValue<T> | null) => void
}
