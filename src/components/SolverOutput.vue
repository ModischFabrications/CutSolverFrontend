<template>
    <!-- compute validness -->
    <div v-if="result" id="solver-output" class="solver_output">
        <h2>Output</h2>
        <b-table sticky-header=true hover outlined :items="result.lengths">
        </b-table>

    </div>
    <!-- 1. hidden, 2. valid: show, 3. invalid: (better) warning -->
    <div v-else>
        <h2>No output available!</h2>
    </div>
</template>

<script>
    function Result(solver_type, time_ms, lengths) {
        this.solver_type = solver_type;
        this.time_ms = time_ms;
        this.lengths = lengths;
    }

    export default {
        name: "SolverOutput",
        props: {
            result: {
                type: Result,
                required: true
            }
        },
    }
</script>

<style scoped>

</style>