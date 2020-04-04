<template>
    <div id="app">
        <b-navbar type="light" variant="light" print>
            <!-- display as clickable (home) icon in top left -->

            <b-navbar-brand href="#">
                <img alt="Vue logo" height="32" src="./assets/logo.png" class="d-inline-block align-top">
                {{ title }}
            </b-navbar-brand>

            <b-navbar-nav class="ml-auto">
                <b-nav-item @click="$bvModal.show('about-modal')">About</b-nav-item>
            </b-navbar-nav>
        </b-navbar>

        <About></About>

        <!-- side by side on desktop, top to bottom on mobile -->
        <SolverInput></SolverInput>

        <!-- centered and square on desktop, long bar button on mobile -->
        <b-button pill size="lg" type='submit' @click="startSolving">Solve</b-button>

        <!-- output field for json API answer -->
        <b-collapse id="output-collapse" v-model="showResult">
            <SolverOutput :result="result"></SolverOutput>
        </b-collapse>
        <!-- [x] live update ?-->
    </div>
</template>

<script>
    import SolverInput from "@/components/SolverInput";
    import SolverOutput from "@/components/SolverOutput";
    import {Result} from "@/components/data/Result";
    // example values
    import json_testresult from "./tests/data/testresult.json"
    import About from "@/components/About";
    // stupid, better way?
    let testresult = new Result(json_testresult.solver_type, json_testresult.time_ms, json_testresult.lengths);

    const title = "CutSolver";

    export default {
        name: 'App',
        components: {
            About,
            SolverOutput,
            SolverInput,
            // ...
        },
        data: function () {
            return {
                // won't change page title, might need to do something else
                title: title,

                result: new Result(),
                showResult: false
            };
        },
        methods: {
            startSolving() {
                console.log("startSolving");
                console.log(SolverInput.computed.job());

                // TODO: call API, -1 is an invalid value
                let reply = (Math.random() > 0.2) ? testresult : new Result();
                console.assert(reply !== null);
                console.log(reply);

                this.result = reply;
                this.showResult = true;
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
</style>
