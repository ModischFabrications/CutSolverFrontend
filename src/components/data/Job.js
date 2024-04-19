export class Job {
    constructor(stocks, cut_width, required) {
        this.cut_width = cut_width;
        this.stocks = stocks;
        this.required = required;
    }

    valid() {
        // TODO allow for more stocks
        return ((this.stocks instanceof Map) && this.stocks.length > 0 &&
            this.stocks.every(Number.isNumber) && this.stocks.every(s => s.length > 0) &&
            Number.isInteger(this.cut_width) && this.cut_width > 0 &&
            (this.required instanceof Map) && this.required.length > 0
        );
    }
}
