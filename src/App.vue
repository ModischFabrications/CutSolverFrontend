<template>
    <div id="app">
        <b-navbar type="light" variant="light" print>
            <b-navbar-brand href="#">
                <img alt="Vue logo" height="32" src="./assets/logo.png" class="d-inline-block align-top">
                {{ title }}
            </b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item href="http://github.com/ModischFabrications">by Modisch Fabrications</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item @click="$bvModal.show('about-modal')">About</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <!-- needs to be registered, hidden by default -->
        <About></About>

        <!-- side by side on desktop, top to bottom on mobile? -->

        <!-- read input values -->
        <SolverInput></SolverInput>

        <!-- centered and square on desktop, long bar button on mobile -->
        <b-button id="solve-button" class="solve_button" pill size="lg" type='submit' @click="startSolving">Solve
        </b-button>

        <!-- output field for json API answer, hidden by default -->
        <b-collapse id="output-collapse" v-model="showResult">
            <SolverOutput :result="result"></SolverOutput>
        </b-collapse>
        <!-- [x] live update ?-->
    </div>
</template>

<script>
    import About from "@/components/About";
    import SolverInput from "@/components/SolverInput";
    import SolverOutput from "@/components/SolverOutput";
    // example values
    import {Result} from "@/components/data/Result";
    import json_testresult from "./tests/data/testresult.json"

    // stupid, better way?
    let testresult = new Result(json_testresult.solver_type, json_testresult.time_ms, json_testresult.lengths);

    const title = "CutSolver";

    export default {
        name: 'App',
        components: {
            About,
            SolverInput,
            SolverOutput,
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
                console.log("startSolving with ");
                console.log(SolverInput.computed.job());

                // TODO: call API
                let reply = (Math.random() > 0.2) ? testresult : new Result();
                console.assert(reply !== null);
                console.log("Result: ");
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

    .solve_button {
        margin: 16px;
    }

    .nav_link {
        color: grey;
    }
</style>
