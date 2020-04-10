<template>
    <b-navbar type="light" variant="light" print>
        <b-navbar-brand href="#">
            <img alt="logo" height="32" src="../assets/logo.svg" class="d-inline-block align-top">
            {{ title }}
        </b-navbar-brand>
        <b-navbar-nav>
            <b-nav-item href="http://github.com/ModischFabrications">by Modisch Fabrications</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-nav-item @click="$bvModal.show('about-modal')">About</b-nav-item>
        </b-navbar-nav>

        <!-- needs to be registered somewhere, hidden by default -->
        <About></About>
    </b-navbar>
</template>

<script>
    import About from "@/components/About";

    export default {
        name: "NavBar",
        components: {
            About,
        },
        props: {
            title: String
        }
    }
</script>

<style scoped>

</style>