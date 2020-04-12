export class Result {
    constructor(solver_type, time_us, lengths) {
        this.solver_type = solver_type;
        this.time_us = time_us;
        this.lengths = lengths;
    }

    valid() {
        return (this.solver_type && this.solver_type.length > 0 &&
            Number.isInteger(this.time_us) && this.time_us > 0 &&
            Array.isArray(this.lengths) && this.lengths.length > 0
        );
    }
}
