<template>
    <b-navbar
        print
        type="light"
        variant="light"
    >
        <b-navbar-brand href="#">
            <img
                alt="logo"
                class="d-inline-block align-top"
                height="32"
                src="../assets/logo.svg"
            >
            CutSolver
        </b-navbar-brand>
        <b-navbar-nav>
            <b-nav-item href="http://github.com/ModischFabrications">
                by Modisch Fabrications
            </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-nav-item @click="$bvModal.show('modal-about')">
                About
            </b-nav-item>
        </b-navbar-nav>

        <!-- needs to be registered somewhere, hidden by default -->
        <About/>
    </b-navbar>
</template>

<script>
    import About from "@/components/ModalAbout";

    export default {
        name: "NavBar",
        components: {
            About,
        }
    }
</script>

<style scoped>

</style>