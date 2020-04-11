<template>
    <div id="app">
        <NavBar :title="title"></NavBar>

        <b-overlay :show="loadingResult">
            <!-- side by side on desktop, top to bottom on mobile? -->

            <!-- read input values -->
            <SolverInput ref="main_input"></SolverInput>

            <!-- centered and square on desktop, long bar button on mobile -->
            <b-button id="solve-button" class="solve_button" pill size="lg" type='submit' @click="startSolving">Solve
            </b-button>

            <!-- output field for json API answer, hidden by default -->
            <b-collapse id="output-collapse" v-model="showResult">
                <SolverOutput :result="result" :job="job"></SolverOutput>
            </b-collapse>
            <!-- [x] live update ?-->

        </b-overlay>
    </div>
</template>

<script>
    import SolverInput from "@/components/SolverInput";
    import SolverOutput from "@/components/SolverOutput";
    import {Job} from "@/components/data/Job";
    import {Result} from "@/components/data/Result";
    // example values
    import json_testresult from "./tests/data/testresult.json"
    import NavBar from "@/components/NavBar";
    import axios from "axios";

    let testresult = Object.assign(new Result(), json_testresult);

    const title = "CutSolver";

    export default {
        name: 'App',
        components: {
            NavBar,
            SolverInput,
            SolverOutput,
        },
        data: function () {
            return {
                // won't change page title, might need to do something else
                title: title,

                job: new Job(),
                result: new Result(),
                loadingResult: false,
                showResult: false
            };
        },
        methods: {
            startSolving() {
                console.log("startSolving with ");
                this.job = this.$refs["main_input"].asJob();
                console.log(this.job);
                this.showResult = false;
                this.loadingResult = true;

                // this.callMockSolver(this.job)
                this.callSolver(this.job)
            },
            handleResult(result) {
                console.log("Result: ");
                console.log(result);
                // TODO: better way for singleshot updates, similar to parameter?
                this.result = result;
                this.loadingResult = false;
                this.showResult = true;
            },
            callMockSolver(job) {
                console.log("faking output for " + job)
                let reply = (Math.random() > 0.2) ? testresult : new Result();
                console.assert(reply !== null);

                setTimeout(() => {
                    this.handleResult(reply);
                }, 2000);
            },
            callSolver(job) {
                console.assert(process.env.VUE_APP_BACKEND_SOLVER_URL, "Set environment variable 'BACKEND_SOLVER_URL=http://xxx/solve'");
                console.log("Posting to " + process.env.VUE_APP_BACKEND_SOLVER_URL);
                axios.post(process.env.VUE_APP_BACKEND_SOLVER_URL, job)
                    .then((reply) => {
                        this.handleResult(Object.assign(new Result(), reply.data));
                    }).catch(error => {
                    if (error.response) {
                        // request was made but server responded with status code != 2xx
                        this.handleResult(error.response.data);
                    } else if (error.request) {
                        // request was made but server did not respond
                        console.log(error.request);
                    }
                });
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .solve_button {
        margin: 16px;
    }

    .nav_link {
        color: grey;
    }
</style>
