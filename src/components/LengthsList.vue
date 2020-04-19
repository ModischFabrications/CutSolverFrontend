<template>
    <b-list-group v-if="result !== null">
        <b-list-group-item
            v-for="(stock, id) in result.lengths"
            :key="id"
        >
            <b-progress
                :max="max_length"
                height="2rem"
            >
                <template v-for="(length, index) in stock">
                    <b-progress-bar
                        :key="index"
                        :value="length"
                        class="bar_label"
                        show-value
                        variant="secondary"
                    />
                    <b-progress-bar
                        :key="-1-index"
                        :value="cut_width"
                        striped
                        variant="dark"
                    />
                </template>
            </b-progress>
        </b-list-group-item>
    </b-list-group>
</template>
<script>
    export default {
        name: 'LengthsList',
        props: {
            // use internal job for values
            max_length: {},
            cut_width: {},
            result: {}
        }
    }
</script>
<style scoped>

    .bar_label {
        font-size: large;
    }
</style>