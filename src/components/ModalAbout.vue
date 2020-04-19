<template>
    <b-modal
        id="modal-about"
        centered
        header-bg-variant="light"
        hide-footer
        scrollable
        size="lg"
        title="About"
    >
        CutSolver {{ version }}, by Modisch Fabrications.
        <VueShowdown :markdown="about_file_content"/>
    </b-modal>
</template>

<script>
    import about_file_content from '!raw-loader!../assets/content/about.md';

    export default {
        name: "About",
        data: function () {
            return {
                version: process.env.VUE_APP_VERSION,
                about_file_content: about_file_content
            }
        }
    }
</script>

<style scoped>

</style>