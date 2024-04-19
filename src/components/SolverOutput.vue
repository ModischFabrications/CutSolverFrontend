<template>
    <!-- 1. hidden, 2. valid: show, 3. invalid: warning -->
    <div
        id="solver-output"
        class="solver_output"
    >
        <h2>Output</h2>

        <b-overlay
            :show="warning !== null || result === null"
            opacity="0.95"
        >
            <template #overlay>
                <div
                    v-if="warning !== null"
                    class="text-center"
                >
                    Invalid result: {{ warning }}
                </div>
                <div
                    v-else-if="result === null"
                    class="text-center"
                >
                    Hit [Solve] to get results.
                </div>
            </template>

            <div v-if="validResult(result)">
                <p>Solved using {{ result.solver_type }}. Calculation took {{ usToMs(result.time_us) }}ms.</p>

                <LengthsList
                    :cut-width="result.job.cut_width"
                    :result="result"
                />
            </div>
            <div v-else>
                <!-- fake data -->
                <p>Solved using pure magic. Calculation took forever.</p>

                <LengthsList
                    :cut-width="testresult.job.cut_width"
                    :result="testresult"
                />
            </div>
        </b-overlay>
    </div>
</template>

<script>
    import validators from "@/components/data/validators";
    import LengthsList from "@/components/LengthsList";

    import json_testresult from "../tests/data/testresult.json"
    import {Result} from "@/components/data/Result";
    let testresult = Object.assign(new Result(), json_testresult);

    export default {
        name: "SolverOutput",
        components: {LengthsList},
        mixins: [validators],
        props: {
        },
        data() {
            return {
                result: null,
                warning: null,

                testresult: testresult
            }
        },
        computed: {},
        methods: {
            reset() {
                this.result = null;
                this.warning = null;
            },
            setResult(result) {
                console.assert(this.validResult(result));
                this.result = result;
                this.warning = null;
            },
            setWarning(text) {
                this.warning = text;
                // TODO: set fake result as background as soon as job is included in it.
                // makes v-else irrelevant, pass only result to object
            },
            usToMs(duration) {
              return (duration/1000).toFixed(1);
            }
        }
    }
</script>

<style scoped>
    .solver_output {
        padding: 8px;
    }

</style>