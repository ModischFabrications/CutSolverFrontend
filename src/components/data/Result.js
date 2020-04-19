import {Job} from "@/components/data/Job";

export class Result {
    constructor(job, solver_type, time_us, lengths) {
        this.job = job;
        this.solver_type = solver_type;
        this.time_us = time_us;
        this.lengths = lengths;
    }

    valid() {
        // TODO: check job? might not care anymore, we have got a result
        return (this.job instanceof Job &&
            this.solver_type && this.solver_type.length > 0 &&
            Number.isInteger(this.time_us) && this.time_us > 0 &&
            Array.isArray(this.lengths) && this.lengths.length > 0
        );
    }
}
