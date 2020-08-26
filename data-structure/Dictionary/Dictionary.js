import {
    defaultToString as toStrFn,
    ValuePair
} from '../util.js'



export default class Dictionary {
    constructor(toStr = toStrFn) {
        this.toStr = toStr
        this.table = {}
    }
    has(key) {
        return this.table[this.toStr(key)] != null
    }
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStr(key)
            this.table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false
    }
    get(key) {
        const valuePair = this.table[this.toStr(key)]
        valuePair == null ? undefined : valuePair.value
    }
    del(key) {
        if (this.has(key)) {
            delete this.table[this.toStr(key)]
            return true
        }
        return false
    }
}