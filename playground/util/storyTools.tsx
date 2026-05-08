import type { Meta, StoryObj } from "@storybook/react-vite"
import { deepMerge, keysOf, titleCase } from "@cjaye/utils"
import type { BaseProps } from "@/types"
import { DEFAULT_COMPONENT_STATE } from "@/const/state"
import type { FC } from "react"
import type { KeyOf } from "@cjaye/utils"
import { unit } from "~/assets/scss"

export function generateStateStory<T extends BaseProps>(
    meta: Meta<T>,
    state?: "all" | "idle" | KeyOf<typeof DEFAULT_COMPONENT_STATE>,
): StoryObj<typeof meta> {
    return {
        render: state === "all"
            ? (args: T) => {
                const Component = meta.component as FC<T>
                return (
                    <div style={{
                        display: "grid",
                        height: "100%",
                        width: "max-content",
                        gridAutoFlow: "column",
                        gridAutoColumns: "1fr",
                        gridTemplateRows: "max-content max-content",
                        placeItems: "start",
                        gap: unit(4),
                        padding: unit(4),
                        overflow: "visible",
                    }}
                    >
                        <label className="prose">
                            <span>Idle</span>
                        </label>
                        <Component {...args} />
                        {keysOf(DEFAULT_COMPONENT_STATE).map(s => (
                            <>
                                <label className="prose">
                                    <span>{titleCase(s)}</span>
                                </label>
                                <Component
                                    {...args}
                                    stateProps={{ stateOverride: { [s]: true } }}
                                />
                            </>
                        ))}
                    </div>
                )
            }
            : meta.render,
        args: state && !["all", "idle"].includes(state)
            ? deepMerge(meta.args, {
                stateProps: {
                    stateOverride: { [state]: true },
                },
            })
            : meta.args,
    } as StoryObj<typeof meta>
}
