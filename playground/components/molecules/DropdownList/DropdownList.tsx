import type { JSONPrimitive, LabelValue } from "@cjaye/utils"
import { useCallback, useEffect, useState } from "react"
import { useComponentState, useOptionsSearch } from "@/hooks"
import type { DropdownListProps } from "./types"
import classNames from "classnames"

import DropdownListItem from "~/components/DropdownListItem"

import scss from "./dropdown-list.module.scss"
import { toJson } from "@cjaye/utils"

export const DropdownList = <T extends JSONPrimitive = JSONPrimitive>({
    items = [],
    value = null,
    onKeyDown,
    onSelection: _onSelection,
    onSearch,
    stateProps,
    className,
    children,
    ...props
}: DropdownListProps<T>) => {
    const { ref } = useComponentState(stateProps)
    const { ref: itemRef, refs: itemRefs } = useComponentState()

    const [selectedValue, setSelectedValue] = useState<T | null>(value)
    const [highlightedValue, setHighlightedValue] = useState<T | null>(value)

    const onSelection = useCallback((value: LabelValue<T> | null) => {
        setHighlightedValue(value?.value ?? null)
        setSelectedValue(value?.value ?? null)
        _onSelection?.(value)
    }, [_onSelection])

    const {
        onSearchInput,
    } = useOptionsSearch({
        items,
        getTerms: item => item.label,
        onMatch: (item) => {
            setHighlightedValue(item.value)
            itemRefs.current[toJson(item.value)]!.scrollIntoView({
                inline: "center",
                block: "center",
                behavior: "smooth",
            })
        },
        cooldown: 3000,
        onSearch,
    })

    const onKey = useCallback((ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (["ArrowUp", "ArrowDown"].includes(ev.key)) {
            const index = highlightedValue
                ? Math.max(items.findIndex(x => x.value === highlightedValue), 0)
                : 0
            const offset = ev.key === "ArrowUp" ? -1 : 1
            const value = items[Math.min(Math.max(index + offset, 0), items.length - 1)].value
            setHighlightedValue(value)
            itemRefs.current[toJson(value)]!.scrollIntoView({
                inline: "center",
                block: "center",
                behavior: "smooth",
            })
            ev.preventDefault()
        }
        if (ev.key === "Enter") {
            onSelection?.(highlightedValue
                ? {
                    label: items.find(item => item.value === highlightedValue)?.label ?? "",
                    value: highlightedValue,
                }
                : null)
            ev.preventDefault()
        }
        onSearchInput(ev)
        onKeyDown?.(ev)
    }, [onSearchInput, onKeyDown, highlightedValue, items, itemRefs, onSelection])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedValue(value)
        setHighlightedValue(value)
    }, [value])

    return (
        <div
            {...props}
            ref={ref}
            className={classNames(scss.dropdownList, className)}
            tabIndex={-1}
            onKeyDown={onKey}
        >
            {children ?? items.map(({ value: v, ...props }) => (
                <DropdownListItem
                    {...props}
                    className={classNames(scss.dropdownListItem)}
                    key={toJson(v)}
                    value={v}
                    selected={v === selectedValue}
                    onSelection={v => onSelection(v)}
                    stateProps={{
                        ...props.stateProps,
                        ref: el => itemRef(el, toJson(v)),
                        stateOverride: {
                            ...props.stateProps?.stateOverride,
                            highlighted: v === highlightedValue && v !== selectedValue,
                        },
                    }}
                />
            ))}
        </div>
    )
}
