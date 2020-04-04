export class Result {
    constructor(solver_type, time_ms, lengths) {
        this.solver_type = solver_type;
        this.time_ms = time_ms;
        this.lengths = lengths;
    }

    valid() {
        return (this.solver_type !== undefined && this.solver_type.length > 0 &&
            this.time_ms !== undefined && this.time_ms > 0 &&
            this.lengths !== undefined && this.lengths.length > 0
        );
    }
}
