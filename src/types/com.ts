import { type ComponentPropsWithRef, type ElementType, type MutableRefObject, type PropsWithChildren, type Ref } from "react"
import type { Maybe, Obj } from "@cjaye/utils"
import type { THEME } from "@/const/state"

export interface UseComponentStateReturn<S extends Obj<boolean | undefined> = ComponentState> {
    ref: (node: HTMLElement | SVGElement | null, key?: string) => void
    refs: MutableRefObject<Obj<HTMLElement | SVGElement | null>>
    state: ComponentState<S>
    updateState: (patch: Partial<ComponentState<S>>, key?: string) => void
}

export type ComponentState<T extends Obj<boolean | undefined> = Obj<boolean | undefined>> = Obj<boolean | undefined> & {
    selected?: boolean | undefined
    hover?: boolean | undefined
    active?: boolean | undefined
    highlighted?: boolean | undefined
    focusNavigation?: boolean | undefined
    focusWithin?: boolean | undefined
    focus?: boolean | undefined
    error?: boolean | undefined
    pressed?: boolean | undefined
    disabled?: boolean | undefined
} & {
    [K in keyof T]?: boolean | undefined
}

export interface ComponentStateProps<
    S extends ComponentState = ComponentState,
    E extends Ref<HTMLElement> = Ref<HTMLElement>,
> {
    stateDefinition?: ComponentState<S>
    stateOverride?: { [K in keyof ComponentState<S>]?: boolean | Obj<boolean | undefined> }
    onStateChange?: (state: ComponentState<S>, key: string) => void
    ref?: E
    stateRef?: MutableRefObject<Maybe<UseComponentStateReturn<S>>>
}

export type BaseProps<
    T = ElementType,
    O extends keyof (T extends ElementType
        ? ComponentPropsWithRef<T>
        : PropsWithChildren<T>
    ) = never,
    S extends ComponentState = {},
> = {
    "data-theme"?: `${typeof THEME[keyof typeof THEME]}`
} & Omit<
    (T extends ElementType
        ? ComponentPropsWithRef<T>
        : PropsWithChildren<T>
    ), O> & (S extends never
        ? {}
        : { stateProps?: ComponentStateProps<
            S,
            T extends ElementType
                ? ComponentPropsWithRef<T>["ref"]
                : Ref<HTMLElement>>
        })
