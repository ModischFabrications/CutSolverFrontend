<template>
    <div id="app">
        <b-navbar type="dark">
            <b-navbar-brand href="#">{{ title }}</b-navbar-brand>
            <!-- display as clickable (home) icon in top left -->
            <img alt="Vue logo" src="./assets/logo.png">

            <b-navbar-nav class="ml-auto">

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
        margin-top: 60px;
    }
</style>
