<template>
    <!-- compute validness -->
    <!-- 1. hidden, 2. valid: show, 3. invalid: (better) warning -->
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
                return (result !== null && result.lengths !== undefined);
            }
        }
    }
</script>

<style scoped>

</style>