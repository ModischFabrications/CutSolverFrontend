<template>
    <div id="app">
        <b-navbar type="light" variant="light" print>
            <!-- display as clickable (home) icon in top left -->

            <b-navbar-brand href="#">
                <img alt="Vue logo" height="32" src="./assets/logo.png" class="d-inline-block align-top">
                {{ title }}
            </b-navbar-brand>

            <b-navbar-nav class="ml-auto">

                <b-nav-item href="#">About</b-nav-item>
                <!-- explain why/how I did it -->
                <!-- fold out/popup short explanation -->
                <!-- donate -->
                <!-- github link -->

                <!-- make icon: fontawesome? -->
                <!--                <b-nav-item href="https://github.com/ModischFabrications/CutSolverFrontend">GitHub</b-nav-item>-->
            </b-navbar-nav>
        </b-navbar>

        <!-- side by side on desktop, top to bottom on mobile -->
        <SolverInput></SolverInput>

        <!-- Button "solve now" that collects input, calls API and displays output -->
        <!-- centered and square on desktop, long bar button on mobile -->
        <b-button pill size="lg" type='submit'>Solve</b-button>

        <!-- output field for json API answer -->
        <SolverOutput :result="result"></SolverOutput>

        <!-- [x] live update ?-->
    </div>
</template>

<script>
    import SolverInput from "@/components/SolverInput";
    import SolverOutput from "@/components/SolverOutput";
    // import Result from "@/components/SolverOutput";
    // TODO example values
    import json_testresult from "./tests/data/testresult.json"
    // let testresult = Result(json_testresult.solver_type, json_testresult.time_ms, json_testresult.lengths);

    const title = "CutSolver";

    export default {
        name: 'App',
        components: {
            SolverOutput,
            SolverInput,
            // ...
        },
        data: function () {
            return {
                title: title,
                // typecast to Result
                result: json_testresult
            };
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
