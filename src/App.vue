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

        <!-- output field for json API answer -->

        <!-- [x] live update ?-->
    </div>
</template>

<script>
    import SolverInput from "@/components/SolverInput";

    const title = "CutSolver";

    export default {
        name: 'App',
        components: {
            SolverInput,
            // ...
        },
        data: function () {
            return {
                title: title,
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
