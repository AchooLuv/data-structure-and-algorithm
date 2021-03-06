export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};

export function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a > b ? Compare.BIGGER_THAN : Compare.LESS_THAN;
}

export function defaultEquals(a, b) {
    return a === b;
}

export function defaultToString(item) {
    if (item === null) {
        return "NULL"
    } else if (item === undefined) {
        return "UNDEFINED"
    } else if (typeof item === "string" || item instanceof String) {
        return `${item}`
    }
    return item.toString()
}

export class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
    toString() {
        return `[#${this.key}:${this.value}]`
    }
}