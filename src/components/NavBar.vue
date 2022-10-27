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
                :src="require(`@/assets/logo.svg`)"
            >
            CutSolver
        </b-navbar-brand>

        <b-navbar-nav class="ml-auto">
            <b-nav-item
                href="http://github.com/ModischFabrications"
                target="_blank"
            >
                <b-icon-github/>
            </b-nav-item>
            <b-nav-text>
                | 
            </b-nav-text>
            <b-nav-item
                href="https://www.buymeacoffee.com/modisch"
                target="_blank"
            >
                <b-icon-cup/>
            </b-nav-item>
            <b-nav-text>
                |
            </b-nav-text>
            <b-nav-item @click="$bvModal.show('modal-about')">
                About
            </b-nav-item>
        </b-navbar-nav>

        <!-- loader for markdown parser, popup is hidden by default -->
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