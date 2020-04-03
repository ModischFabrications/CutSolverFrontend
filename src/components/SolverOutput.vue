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
    export default {
        name: "SolverOutput",
        props: {
            result: Object
        },
    }
</script>

<style scoped>

</style>