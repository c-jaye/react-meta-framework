import { isFocusable } from "tabbable"

export function nextFocusable(element?: Element | null) {
    if (!element) return null
    if (isFocusable(element)) return element as HTMLElement
    let node: Element | null = element.parentElement
    while (node) {
        if (node.firstElementChild) {
            node = node.firstElementChild
            continue
        }
        while (node && !node.nextElementSibling) {
            node = node.parentElement
        }
        node = node?.nextElementSibling ?? null
        if (node && isFocusable(node)) {
            return node as HTMLElement
        }
    }

    return null
}
