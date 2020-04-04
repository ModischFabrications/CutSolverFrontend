<template>
    <!-- 1. hidden, 2. valid: show, 3. invalid: warning -->
    <div v-if="valid(result)" id="solver-output" class="solver_output">
        <h2>Output</h2>
        <b-table sticky-header=true hover outlined :items="result.lengths">
        </b-table>
    </div>
    <div v-else>
        <h2>Invalid result received, try again.</h2>
    </div>
</template>

<script>
    import {Result} from "@/components/data/Result";

    export default {
        name: "SolverOutput",
        props: {
            result: {
                type: Result,
                required: true
            }
        },
        methods: {
            valid(result) {
                return (result !== null &&
                    result.solver_type !== undefined && result.solver_type.length > 0 &&
                    result.time_ms !== undefined && result.time_ms > 0 &&
                    result.lengths !== undefined && result.lengths.length > 0
                );
            }
        }
    }
</script>

<style scoped>

</style>