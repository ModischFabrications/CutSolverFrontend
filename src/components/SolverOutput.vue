<template>
    <!-- compute validness -->
    <!-- 1. hidden, 2. valid: show, 3. invalid: (better) warning -->
    <!-- TODO: stupid mess, see below -->
    <div v-if="typeof result !== Result && result===0">
        <h2>Press "solve" to start</h2>
    </div>
    <div v-else-if="typeof result !== Result && result===-1">
        <h2>Invalid result received, try again.</h2>
    </div>
    <div v-else-if="typeof result === Result && result !== null" id="solver-output" class="solver_output">
        <h2>Output</h2>
        <b-table sticky-header=true hover outlined :items="result.lengths">
        </b-table>
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
                // TODO: is there a better way to differentiate states?
                // set invalid from internal parsing and hide until first called?
                // v-if=valid(result), else "invalid"
                type: [Number, Result],
                required: true
            }
        },
    }
</script>

<style scoped>

</style>