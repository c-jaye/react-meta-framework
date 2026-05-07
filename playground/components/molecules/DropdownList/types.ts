import type { JSONPrimitive, LabelValue } from "@cjaye/utils"
import type { BaseProps } from "@/types"
import type { DropdownListItemProps } from "~/components/DropdownListItem"

export interface DropdownListProps<T extends JSONPrimitive = JSONPrimitive> extends BaseProps<"div", "onChange", {}> {
    items?: DropdownListItemProps<T>[]
    value?: T | null
    onSelection?: (value: LabelValue<T> | null) => void
    onSearch?: (term: string) => void
}
