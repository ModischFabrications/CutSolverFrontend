<template>
    <b-list-group v-if="result !== null">
        <b-list-group-item
            v-for="(stock, id) in result.lengths"
            :key="id"
        >
            <b-progress
                :max="maxLength"
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
                        :value="cutWidth"
                        striped
                        variant="dark"
                    />
                </template>
            </b-progress>
        </b-list-group-item>
    </b-list-group>
</template>
<script>
    import {Result} from "@/components/data/Result";

    export default {
        name: 'LengthsList',
        props: {
            // use internal job for values
            maxLength: {
                type: Number,
                required: true
            },
            cutWidth: {
                type: Number,
                required: true
            },
            result: {
                type: Result,
                required: true
            }
        }
    }
</script>
<style scoped>

    .bar_label {
        font-size: large;
    }
</style>