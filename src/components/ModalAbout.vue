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
        <VueShowdown :markdown="about_file_content"/>
    </b-modal>
</template>

<script>
    import about_file_content from '../assets/content/about.md';

    export default {
        name: "About",
        data: function () {
            return {
                about_file_content: about_file_content
            }
        }
    }
</script>

<style scoped>

</style>