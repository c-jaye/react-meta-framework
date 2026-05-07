import type { JSONPrimitive, LabelValue } from "@cjaye/utils"
import type { BaseProps } from "@/types"
import type { DropdownListItemProps } from "~/components/DropdownListItem"

export interface DropdownProps<T extends JSONPrimitive = JSONPrimitive> extends BaseProps<"div", never, {}> {
    items?: DropdownListItemProps<T>[]
    value?: T | null
    onSelection?: (item: LabelValue<T> | null) => void
}
