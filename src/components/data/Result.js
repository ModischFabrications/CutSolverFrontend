export class Result {
    constructor(job, solver_type, time_us, layout) {
        this.job = job;
        this.solver_type = solver_type;
        this.time_us = time_us;
        this.layout = layout;
    }

    valid() {
        // won't check job, we don't care anymore, we have got a result
        return (this.job !== undefined &&
            this.solver_type && this.solver_type.length > 0 &&
            Number.isInteger(this.time_us) && this.time_us > 0 &&
            Array.isArray(this.layout) && this.layout.length > 0
        );
    }
}
