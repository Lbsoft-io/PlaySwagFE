export function getValueByPath(jsonObject: any, pathArray: (string | number)[]): any {
    let current = jsonObject;

    for (const key of pathArray) {
        if (current === undefined || current === null) {
            return undefined; // Return undefined if the path does not exist
        }
        current = current[key];
    }

    return current;
}