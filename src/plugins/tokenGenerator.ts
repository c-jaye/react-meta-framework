import type { PluginOption, ViteDevServer } from "vite"
import { buildTokens } from "../util"

export default function tokenGenerator(
    writeFile: (path: string, content: string) => Promise<unknown>,
    tokensFile: string,
    tokensDir: string,
) {
    void buildTokens(writeFile, tokensFile, tokensDir)

    return {
        configureServer(server: ViteDevServer) {
            server.watcher.on("change", (file) => {
                if (!file.endsWith(tokensFile.split("/").slice(1).join("/"))) return
                void buildTokens(writeFile, tokensFile, tokensDir)
            })
        },
    } as PluginOption
}
