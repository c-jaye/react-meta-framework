import type { DropdownListItemProps } from "./types"
import type { JSONPrimitive } from "@cjaye/utils"
import classNames from "classnames"
import useComponentState from "@/hooks/useComponentState"
import { useEffect } from "react"

import scss from "./dropdown-list-item.module.scss"

export const DropdownListItem = <T extends JSONPrimitive = JSONPrimitive>({
    label,
    value = null,
    selected,
    onSelection,
    onClick,
    stateProps,
    className,
    ...props
}: DropdownListItemProps<T>) => {
    const { ref, updateState } = useComponentState(stateProps)

    useEffect(() => updateState({ selected }), [selected, updateState])

    return (
        <div
            {...props}
            ref={ref}
            className={classNames("prose", scss.dropdownListItem, className)}
            onClick={(ev) => {
                onSelection?.(value === null ? null : { label, value })
                onClick?.(ev)
            }}
        >
            <span className={classNames(scss.text)}>
                {label}
            </span>
        </div>
    )
}
