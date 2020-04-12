<template>
    <b-modal
        id="about-modal"
        size="lg"
        centered
        scrollable
        title="About"
        header-bg-variant="light"
        hide-footer
    >
        <VueShowdown :markdown="about_file_content" />
    </b-modal>
</template>

<script>
    import about_file_content from '!raw-loader!../assets/content/about.md'

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