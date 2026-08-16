import type { TestCardProps } from "./types"
import classNames from "classnames"
import { useComponent } from "@/hooks"

import scss from "./test-card.module.scss"

export const TestCard = ({
    title,
    caption,
    description,
    imgSrc,
    logoSrc,
    buttons,
    "data-theme": theme = "cyncly",
    className,
    ...props
}: TestCardProps) => {
    const { ref } = useComponent(props)
    const { ref: buttonRef } = useComponent()

    return (
        <div
            {...props}
            ref={ref}
            data-theme={theme}
            className={classNames(scss.testCard, className)}
        >
            <div className={classNames(scss.hero)}>
                <img
                    className={classNames(scss.heroImg)}
                    src={imgSrc}
                    alt={title}
                />
            </div>
            <div className={classNames(scss.main)}>
                <div className={classNames(scss.logo)}>
                    <img
                        className={classNames(scss.logoImg)}
                        src={logoSrc}
                        alt={title}
                    />
                </div>
                <div className={classNames("prose", scss.caption)}>
                    <p>{caption}</p>
                </div>
                <div className={classNames("prose", scss.title)}>
                    <h2>{title}</h2>
                </div>
                <div className={classNames("prose", scss.description)}>
                    <p>{description}</p>
                </div>
                <div className={classNames(scss.buttons)}>
                    {!!buttons?.length && (buttons.map(b => (
                        <a
                            key={b.to}
                            ref={el => buttonRef(el, b.to)}
                            href={b.to}
                            className={classNames("prose", scss.button, {
                                primary: scss.primary,
                                secondary: scss.secondary,
                                tertiary: scss.tertiary,
                            }[b.variant])}
                        >
                            <span>{b.label}</span>
                        </a>
                    )))}
                </div>
            </div>
        </div>
    )
}
