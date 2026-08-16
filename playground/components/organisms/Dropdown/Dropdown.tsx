import { useEffect, useState } from "react"
import type { DropdownProps } from "./types"
import type { JSONPrimitive } from "@cjaye/utils"
import classNames from "classnames"
import useComponent from "@/hooks/useComponent"
import useComponentState from "@/hooks/useComponentState"

import DropdownList from "~/components/DropdownList"

import scss from "./dropdown.module.scss"

export const Dropdown = <T extends JSONPrimitive = JSONPrimitive>({
    items = [],
    value = null,
    onSelection,
    stateProps,
    className,
    ...props
}: DropdownProps<T>) => {
    const { ref, state, updateState } = useComponentState({
        ...stateProps,
        onStateChange: (s, k) => {
            if (!s.focusWithin) updateState({ active: false })
            updateButtonState({ disabled: s.disabled })
            updateListState({ active: s.active, focus: s.active, disabled: s.disabled })
            stateProps?.onStateChange?.(s, k)
        },
    })

    const { ref: buttonRef, updateState: updateButtonState } = useComponentState({
        onStateChange: ({ disabled }) => updateState({ disabled }),
    })

    const { ref: searchRef } = useComponentState()

    const { ref: listRef, updateState: updateListState } = useComponent()

    const [selectedValue, setSelectedValue] = useState<T | null>(value)
    const [term, setTerm] = useState("")

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedValue(value ?? null)
    }, [value])

    return (
        <div
            {...props}
            ref={ref}
            className={classNames(scss.dropdown, className)}
        >
            <div
                ref={searchRef}
                className={classNames("prose", scss.term)}
            >
                <span>{term}</span>
            </div>
            <button
                ref={buttonRef}
                className={classNames("prose", scss.button)}
                tabIndex={state.active ? -1 : 0}
                onClick={() => {
                    updateState({ active: !state.active })
                    updateListState({ active: !state.active })
                }}
            >
                <span>
                    {items.find(item => item.value === selectedValue)?.label}
                </span>
            </button>
            <DropdownList
                value={selectedValue}
                items={items}
                onSelection={(v) => {
                    setSelectedValue(v?.value ?? null)
                    updateState({ active: false })
                    updateButtonState({ focus: true })
                    onSelection?.(v)
                }}
                onSearch={x => setTerm(x)}
                onKeyDown={(ev) => {
                    if (ev.key !== "Escape") return
                    updateState({ active: false })
                    updateButtonState({ focus: true })
                    ev.preventDefault()
                }}
                stateProps={{ stateRef: listRef }}
            />
        </div>
    )
}
