<template>
    <b-modal
        id="modal-warning"
        centered
        header-bg-variant="warning"
        hide-footer
        title="Error"
    >
        {{ text }}
    </b-modal>
</template>

<script>
    export default {
        name: 'ModalWarning',
        data: function () {
            return {
                text: String
            }
        }
    }
</script>
