export function ensureArray(object: any | any[]): any[] {
    if (!object.length) return [object]
    return object
}
