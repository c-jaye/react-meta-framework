import { useRef, useState } from "react"

export interface UseOptionSearchOptions<T> {
    items: T[]
    getTerms: (item: T) => string | string[]
    onMatch: (item: T) => void
    onSearch?: (term: string) => void
    cooldown?: number
}

export default function useOptionsSearch<T>({
    items,
    getTerms,
    onMatch,
    onSearch,
    cooldown = 1000,
}: UseOptionSearchOptions<T>) {
    const searchTerm = useRef("")
    const searchTime = useRef(0)

    const [term, setTerm] = useState("")

    const onSearchInput = (ev: React.KeyboardEvent) => {
        if (!/^[A-z0-9 ]$/u.exec(ev.key)?.length) return

        if (!searchTime.current || (searchTime.current + cooldown < Date.now())) {
            searchTerm.current = ""
        }

        searchTerm.current += ev.key.toLowerCase()
        searchTime.current = Date.now()

        const terms = items.map(x => ({
            terms: [getTerms(x)].flat().map(x => x.toLowerCase()),
            item: x,
        })).flat()

        let item = terms.find(x => x.terms.some(term => term.startsWith(searchTerm.current)))
          ?? terms.find(i => i.terms.some(term => term.includes(searchTerm.current)))
          ?? terms.find(i => i.terms.some(term => term.replace(" ", "").includes(searchTerm.current)))

        if (!item && searchTerm.current.length > 1) {
            searchTerm.current = ev.key.toLowerCase()

            item = terms.find(x => x.terms.some(term => term.startsWith(searchTerm.current)))
              ?? terms.find(i => i.terms.some(term => term.includes(searchTerm.current)))
              ?? terms.find(i => i.terms.some(term => term.replace(" ", "").includes(searchTerm.current)))
        }

        if (item) {
            onMatch(item.item)

            setTimeout(() => {
                if (!searchTerm.current || searchTime.current + cooldown >= Date.now()) return
                searchTerm.current = ""
                searchTime.current = 0
                setTerm("")
                onSearch?.("")
            }, cooldown)
        }
        else {
            searchTerm.current = ""
            searchTime.current = 0
        }

        setTerm(searchTerm.current)
        onSearch?.(searchTerm.current)

        ev.stopPropagation()
        ev.preventDefault()
    }

    return {
        onSearchInput,
        term,
    }
}
