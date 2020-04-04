export class Job {
    constructor(max_length, cut_width, target_sizes) {
        // other idea for default values?
        this.max_length = max_length;
        this.cut_width = cut_width;
        this.target_sizes = target_sizes;
    }

    valid() {
        // could use some more checks from Input
        return (this.max_length !== undefined && this.max_length > 0 &&
            this.cut_width !== undefined && this.cut_width > 0 &&
            this.target_sizes !== undefined && this.target_sizes.length > 0
        );
    }
}
