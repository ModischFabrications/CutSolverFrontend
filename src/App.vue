<template>
    <div id="app">
        <NavBar/>

        <ModalWarning ref="modal_warning"/>

        <b-overlay :show="busy">
            <!-- TODO use a better pattern to pass control -->
            <MainSolver
                ref="main_solver"
                :start-solving="startSolving"
            />
        </b-overlay>
        <footer class="fluid-container footer">
            <p>
                CutSolver v{{ version }}, made with 🖤️ by <a
                    href="http://modisch.me"
                    target="_blank"
                >Modisch Fabrications</a> | <a
                    href="https://legal.modisch.me/en/privacy"
                    target="_blank"
                >Privacy Policy</a>
            </p>
        </footer>
    </div>
</template>

<script>
import {Job} from "@/components/data/Job";
import {Result} from "@/components/data/Result";
// example values
import json_testresult from "./tests/data/testresult.json"
import NavBar from "@/components/NavBar";
import axios from "axios";
import ModalWarning from "@/components/ModalWarning";
import validators from "@/components/data/validators";
import MainSolver from "@/components/MainSolver";

let testresult = Object.assign(new Result(), json_testresult);

    const title = "CutSolver";
    const useMockSolver = false;

    export default {
        name: 'App',
        components: {
          MainSolver,
          ModalWarning,
          NavBar,
        },
        mixins: [validators],
        data: function () {
            return {
                title: title,
                version: process.env.VUE_APP_VERSION,

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
                this.job = this.$refs['main_solver'].$refs["input"].job;
                // console.log(this.job);

                this.busy = true;

                if (useMockSolver) this.callMockSolver(this.job)
                  else this.callRemoteSolver(this.job)

            },
            handleReply(reply) {
                // console.log(reply);

                if (this.validResult(reply)) {
                    this.$refs['main_solver'].$refs['output'].setResult(reply);
                }
                else {
                    this.$refs['main_solver'].$refs['output'].setWarning(reply);
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
            callRemoteSolver(job) {
                console.log("Posting to " + this.SOLVER_URL);

                axios.post(this.SOLVER_URL, job)
                    .then((reply) => {
                        this.handleReply(Object.assign(new Result(), reply.data));
                    }).catch(error => {
                        console.log(error);
                    if (error.response) {
                        // got response, but it's an error
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

    .fluid-container.footer a {
      color: #005c93;
    }

    .fluid-container.footer > *:last-child {
        padding: 4rem 2rem 2rem 2rem;
        margin-bottom: 0;
        color: #a1a1a1;
    }
</style>
