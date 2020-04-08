<template>
    <!-- 1. hidden, 2. valid: show, 3. invalid: warning -->
    <div v-if="result.valid()" id="solver-output" class="solver_output">
        <h2>Output</h2>

        <b-list-group>
            <b-list-group-item v-for="(stock, id) in result.lengths" :key="id">
                <b-progress :max=job.max_length>
                    <template v-for="(length, index) in stock">
                        <b-progress-bar :key="index" :value="length" show-value variant="info"></b-progress-bar>
                        <b-progress-bar :key="-1-index" :value="job.cut_width" variant="dark"></b-progress-bar>
                    </template>
                </b-progress>
            </b-list-group-item>
        </b-list-group>
    </div>
    <div v-else>
        <h2>Invalid result received, try again.</h2>
    </div>
</template>

<script>
    import {Job} from "@/components/data/Job";
    import {Result} from "@/components/data/Result";

    export default {
        name: "SolverOutput",
        props: {
            job: {
                type: Job,
                required: true
            },
            result: {
                type: Result,
                required: true
            }
        },
        computed: {
            indexedResult: function () {
                return 1;   // TODO: turn every array entry into object and add id=index++
            }
        }
    }
</script>

<style scoped>
    .solver_output {
        margin: 16px;
    }
</style>