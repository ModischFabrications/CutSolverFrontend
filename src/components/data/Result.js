export class Result {
    constructor(solver_type, time_us, lengths) {
        this.solver_type = solver_type;
        this.time_us = time_us;
        this.lengths = lengths;
    }

    valid() {
        return (this.solver_type !== undefined && this.solver_type.length > 0 &&
            this.time_us !== undefined && this.time_us > 0 &&
            this.lengths !== undefined && this.lengths.length > 0
        );
    }
}
