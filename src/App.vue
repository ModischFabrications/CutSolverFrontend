<template>
    <div id="app">
        <h1> {{ title }}</h1>
        <img alt="Vue logo" src="./assets/logo.png">
        <SolverInput></SolverInput>
    </div>
</template>

<script>
    import SolverInput from "@/components/SolverInput";

    let title = "CutSolver";

    export default {
        name: 'App',
        components: {
            SolverInput,
            // ...
        },
        data: function () {
            return {
                title: title
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
