import { COMPONENT_STATE_ORDER, DEFAULT_COMPONENT_STATE } from "@/const/state"
import type { ComponentState, ComponentStateProps } from "@/types"
import { type Mutable, type Obj, deepMerge, deepMergeAll, entriesOf, fromJson, isBool, isFunc, isIn, keysOf, wait } from "@cjaye/utils"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export default function useComponentState<S extends Obj<boolean | undefined> = ComponentState>(
    options?: ComponentStateProps<S> & { utiliseTouch?: boolean },
) {
    const {
        ref: parentRef,
        stateDefinition = DEFAULT_COMPONENT_STATE,
        onStateChange,
        stateOverride,
        utiliseTouch = false,
    } = options ?? {}

    const refs = useRef<Obj<HTMLElement | SVGElement | null>>({})
    const states = useRef<Obj<ComponentState<S>>>({})
    const listeners = useRef<Obj<Obj<EventListener>>>({})
    const observers = useRef<Obj<MutationObserver>>({})
    const refreshTimes = useRef<Obj<number>>({})
    const queuedState = useRef<Obj<Partial<ComponentState<S>>>>({})
    const overrides = useRef<Obj<Partial<ComponentState<S>>>>({})

    const [finalState, setFinalState] = useState<Obj<ComponentState<S>> & ComponentState<S>>({})

    const isTouch = useMemo(() => {
        return utiliseTouch && !window.matchMedia("(hover: hover) and (pointer: fine) and (update: fast)").matches
    }, [utiliseTouch])

    const getAttributeState = useCallback((key: string) => {
        const attributeState = refs.current[key]?.getAttribute("data-rms")
        return attributeState === ""
            ? {}
            : fromJson(attributeState ?? "{}") as ComponentState
    }, [])

    const normaliseState = useCallback((state: Partial<ComponentState<S>>) => {
        if (state.focus) {
            state.focusWithin = true
        }

        if (state.disabled) {
            state.focus = state.focusWithin = state.active = state.selected = false
        }

        return state
    }, [])

    const refresh = useCallback(async (key = "default") => {
        normaliseState(queuedState.current[key])

        const attributeState = getAttributeState(key)

        const allStates = normaliseState(deepMergeAll(
            states.current[key],
            queuedState.current[key] ?? {},
            overrides.current?.[key] ?? {},
            attributeState,
        ))

        if (keysOf(allStates).every(k => allStates[k] === states.current[key]?.[k])) {
            queuedState.current[key] = {}
            return
        }

        const rt = refreshTimes.current[key] ?? 0

        if (!!rt) return

        const rt2 = refreshTimes.current[key] = Date.now()
        const delay = Math.max(rt2 + 8 - Date.now(), 0)

        if (!!delay) {
            void await wait(delay)
        }

        refreshTimes.current[key] = 0
        const el = refs.current[key]!

        const innerState = deepMerge(
            states.current[key],
            queuedState.current[key] ?? {},
        ) as ComponentState<S>

        const newState = normaliseState(deepMergeAll(
            innerState,
            overrides.current?.[key] ?? {},
            attributeState,
        ))

        const prevState = states.current[key]
        queuedState.current[key] = {}

        if (keysOf(newState).every(k => newState[k] === states.current[key]?.[k])) return

        states.current[key] = innerState
        setFinalState(s => ({
            ...s,
            [key]: newState,
            ...(key === "default" ? newState : {}),
        }))

        keysOf(stateDefinition)
            .sort((a, b) => COMPONENT_STATE_ORDER.indexOf(b) - COMPONENT_STATE_ORDER.indexOf(a))
            .forEach(k => el.classList[newState[k] ? "add" : "remove"](k))

        onStateChange?.(newState, key)

        if (isIn(el, "disabled") && el.disabled !== newState.disabled) {
            el.disabled = !!newState.disabled
        }
        if (newState.focus && el !== document.activeElement && !prevState.focus) {
            el.focus()
        }
        if (!newState.focus && el === document.activeElement && prevState.focus) {
            el.blur()
        }
    }, [getAttributeState, normaliseState, onStateChange, stateDefinition])

    const updateState = useCallback(<S extends Obj<boolean | undefined> = Obj<boolean | undefined>>(
        patch: Partial<ComponentState<S>>,
        key = "default",
    ) => {
        queuedState.current[key] = deepMerge(queuedState.current[key] ?? {}, patch)

        void refresh(key)
    }, [refresh])

    const getRef = useCallback((node: HTMLElement | SVGElement | null, key = "default") => {
        const ref = refs.current[key]!
        const observer = observers.current[key]

        if (isFunc<void, [HTMLElement | SVGElement | null]>(parentRef)) {
            parentRef?.(node)
        }
        else if (isIn(parentRef, "current")) {
            (parentRef.current as Mutable<HTMLElement | SVGElement | null>) = node
        }

        if (ref && node && ref !== node) {
            const l = listeners.current[key]

            observer.disconnect()
            document.removeEventListener("pointerup", l.pointerup)
            node.removeEventListener("pointerdown", l.pointerdown)
            node.removeEventListener("pointerleave", l.pointerleave)
            node.removeEventListener("pointerenter", l.pointerenter)
            node.removeEventListener("focus", l.focus)
            node.removeEventListener("focusin", l.focusin)
            node.removeEventListener("focusout", l.focusout)
            node.removeAttribute("data-rms")

            delete listeners.current[key]
            delete refs.current[key]
            delete states.current[key]
            delete observers.current[key]
        }

        if (!node || ref === node) return

        refs.current[key] = node

        const l = listeners.current[key] = {
            pointerup: () => {
                if (isTouch || !isIn(stateDefinition, "pressed")) return
                setTimeout(() => updateState({ pressed: false }, key), 125)
            },
            pointerdown: () => {
                if (isTouch || !isIn(stateDefinition, "pressed")) return
                updateState({ pressed: true }, key)
            },
            pointerleave: () => {
                if (isTouch || !isIn(stateDefinition, "hover")) return
                updateState({ hover: false }, key)
            },
            pointerenter: () => {
                if (isTouch || !isIn(stateDefinition, "hover")) return
                updateState({ hover: true }, key)
            },
            focus: () => {
                if (!isIn(stateDefinition, "focus")) return
                updateState({ focus: true }, key)
            },
            focusin: () => {
                if (!isIn(stateDefinition, "focusWithin")) return
                updateState({ focusWithin: true }, key)
            },
            focusout: () => {
                const active = document.activeElement
                let shouldFocusWithinOut = false

                if (isIn(stateDefinition, "focusWithin")) {
                    if (!refs.current[key]?.contains(active) && refs.current[key] !== active && refs.current[key] !== active) {
                        shouldFocusWithinOut = true
                    }
                }
                if (isIn(stateDefinition, "focus")) {
                    updateState({ focus: false, focusWithin: shouldFocusWithinOut ? false : undefined }, key)
                }
            },
        }

        const obs = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes" && mutation.attributeName === "data-rms") {
                    return updateState({}, key)
                }
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    const target = mutation.target as HTMLElement
                    const oldClasses = mutation.oldValue?.split(" ") ?? []
                    const newClasses = target.classList.value.split(" ")
                    const added = newClasses.filter(x => !oldClasses.includes(x) && isIn(stateDefinition, x) && !states.current[key]?.[x])
                    const removed = oldClasses.filter(x => !newClasses.includes(x) && isIn(stateDefinition, x) && !!states.current[key]?.[x])

                    updateState({
                        ...added.reduce((a, v) => ({ ...a, [v]: true }), {}),
                        ...removed.reduce((a, v) => ({ ...a, [v]: false }), {}),
                    }, key)

                    return
                }
                const el = mutation.target as HTMLElement
                if (!isIn(el, "disabled")
                  || mutation.type !== "attributes"
                  || mutation.attributeName !== "disabled"
                  || el.disabled === states.current[key]?.disabled
                  || !isIn(stateDefinition, "disabled")
                ) {
                    return
                }
                const attributeState = getAttributeState(key)
                if (el.disabled) {
                    if (attributeState.disabled === false || overrides.current?.[key]?.disabled === false) {
                        el.disabled = false
                        return
                    }
                    updateState({ disabled: true }, key)
                }
                else {
                    if (attributeState.disabled === true || overrides.current?.[key]?.disabled === true) {
                        el.disabled = true
                        return
                    }
                    updateState({ disabled: false }, key)
                }
            }
        })

        document.addEventListener("pointerup", l.pointerup)
        node.addEventListener("pointerdown", l.pointerdown)
        node.addEventListener("pointerleave", l.pointerleave)
        node.addEventListener("pointerenter", l.pointerenter)
        node.addEventListener("focus", l.focus)
        node.addEventListener("focusin", l.focusin)
        node.addEventListener("focusout", l.focusout)
        node.setAttribute("data-rms", "")
        obs.observe(node, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: ["disabled", "class", "data-rms"],
        })

        const s: ComponentState = {}

        if (isIn(stateDefinition, "focus")) {
            s.focus = node === document.activeElement
        }
        if (isIn(stateDefinition, "focusWithin")) {
            s.focusWithin = node === document.activeElement || node.contains(document.activeElement)
        }
        if (isIn(stateDefinition, "disabled")) {
            s.disabled = isIn(node, "disabled") && !!node.disabled
        }

        observers.current[key] = obs
        states.current[key] ??= {}
        queuedState.current[key] = deepMergeAll(
            stateDefinition ?? {},
            queuedState.current[key] ?? {},
            s ?? {},
        )

        void refresh(key)
    }, [parentRef, stateDefinition, refresh, isTouch, updateState, getAttributeState])

    useEffect(() => {
        const o: Obj<Obj<boolean | undefined>> = overrides.current
        const changedKeys: string[] = []

        entriesOf(stateOverride ?? {})
            .forEach(([k, v]) => {
                entriesOf(isBool(v) ? { default: v } : v ?? {})
                    .forEach(([kk, vv]) => {
                        if (o?.[kk]?.[k] !== vv && !changedKeys.includes(kk)) {
                            changedKeys.push(kk)
                        }
                        o[kk] ??= {}
                        o[kk][k] = vv
                    })
            })

        if (!changedKeys.length) return

        changedKeys.forEach((key) => {
            const newState = deepMerge(
                queuedState.current[key],
                o?.[key] ?? {},
            )

            if (keysOf(newState).every(k => newState[k] === states.current[key]?.[k])) {
                return
            }

            queuedState.current[key] = newState

            void refresh(key)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateOverride])

    return {
        ref: getRef,
        refs: refs,
        state: finalState,
        updateState,
    }
}
