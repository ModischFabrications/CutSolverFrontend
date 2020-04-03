<template>
    <div id="solver-output" class="solver_output">
        <h2>Output</h2>


        <b-table sticky-header=true hover outlined :items="result.lengths">
        </b-table>

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