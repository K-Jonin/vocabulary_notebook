declare global {
    interface String {
        /** 文字列の先頭を大文字に変換 */
        toCapitalized(): string;
    }
}

/**
 * 文字列の先頭を大文字に変換
 */
Object.defineProperty(String.prototype, "toCapitalized", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function(this: String) {
        let str = this.toString();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});

export {};