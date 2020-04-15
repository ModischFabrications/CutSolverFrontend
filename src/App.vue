<template>
    <div id="app">
        <NavBar :title="title"/>

        <ModalWarning ref="modal_warning"/>

        <b-overlay :show="busy">
            <b-container fluid="true">
                <b-row
                    align-h="center"
                >
                    <b-col xl="5">
                        <SolverInput ref="main_input"/>
                    </b-col>

                    <b-col
                        xl="*"
                        align-self="center"
                    >
                        <!-- centered and square on desktop, long bar button on mobile? -->
                        <b-button
                            id="solve-button"
                            class="solve_button"
                            pill
                            size="lg"
                            type="submit"
                            @click="startSolving"
                        >
                            Solve
                        </b-button>
                    </b-col>
                
                    <b-col
                        xl="5"
                    >
                        <!-- output field for json API answer, hidden by default -->
                        <SolverOutput
                            ref="main_output"
                            :job="job"
                        />
                    </b-col>
                    <!-- [x] live update ?-->
                </b-row>
            </b-container>
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
    import ModalWarning from "@/components/ModalWarning";
    import validators from "@/components/data/validators";

    let testresult = Object.assign(new Result(), json_testresult);

    const title = "CutSolver";

    export default {
        name: 'App',
        components: {
            ModalWarning,
            NavBar,
            SolverInput,
            SolverOutput,
        },
        mixins: [validators],
        data: function () {
            return {
                // won't change page title, might need to do something else
                title: title,

                job: new Job(),
                busy: false,

                SOLVER_URL: process.env.VUE_APP_BACKEND_SOLVER_URL
            };
        },
        mounted: function () {
            this.setupEnv();
            if (!this.SOLVER_URL) {
                this.showWarning("Set environment variable 'VUE_APP_BACKEND_SOLVER_URL=http://xxx/solve'");
            }
        },
        methods: {
            setupEnv() {
                // we have node and everything is working as expected
                if (this.SOLVER_URL) return;

                // magic string substitution from entrypoint.sh replaces placeholder with actual value
                this.SOLVER_URL = '$VUE_APP_BACKEND_SOLVER_URL';
                if (this.SOLVER_URL[0] === "$") this.showWarning("Magic string substitution for backend url failed.");
                console.log("Solver URL is now " + '$VUE_APP_BACKEND_SOLVER_URL');
            },
            showWarning(text) {
                console.warn(text);
                this.$refs["modal_warning"].text = text;
                this.$bvModal.show("modal-warning");
            },
            startSolving() {
                console.log("startSolving with ");
                this.job = this.$refs["main_input"].job;
                console.log(this.job);

                this.busy = true;
                this.$refs['main_output'].reset();

                // this.callMockSolver(this.job)
                this.callSolver(this.job)
            },
            handleReply(reply) {
                console.log("Result: ");
                console.log(reply);

                if (this.validResult(reply)) {
                    this.$refs['main_output'].setResult(reply);
                }
                else {
                    this.$refs['main_output'].setWarning(reply);
                }

                this.busy = false;
            },
            callMockSolver(job) {
                console.log("faking output for " + job)
                let reply = (Math.random() > 0.2) ? testresult : "fake wrong answer";
                console.assert(reply !== null);

                setTimeout(() => {
                    this.handleReply(reply);
                }, 2000);
            },
            callSolver(job) {
                console.log("Posting to " + this.SOLVER_URL);

                axios.post(this.SOLVER_URL, job)
                    .then((reply) => {
                        this.handleReply(Object.assign(new Result(), reply.data));
                    }).catch(error => {
                        console.log(error);
                    if (error.response) {
                        // request was made but server responded with status code != 2xx
                        this.handleReply(error.response.data);
                    } else if (error.request) {
                        // request was made but server did not respond
                        this.handleReply("Server is offline");
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
