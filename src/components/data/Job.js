export class Job {
    constructor(max_length, cut_width, target_sizes) {
        // other idea for default values?
        this.max_length = max_length;
        this.cut_width = cut_width;
        this.target_sizes = target_sizes;
    }

    valid() {
        // could use some more checks from Input
        return (Number.isInteger(this.max_length) && this.max_length > 0 &&
            Number.isInteger(this.cut_width) && this.cut_width > 0 &&
            Array.isArray(this.target_sizes) && this.target_sizes.length > 0
        );
    }
}
