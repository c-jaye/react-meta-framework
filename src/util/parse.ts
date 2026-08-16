import { isString, toJson } from "@cjaye/utils"

export function stringOrJson(data: unknown) {
    return isString(data) ? data : toJson(data)
}
