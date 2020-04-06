<template>
    <b-row>
        <b-col sm="4">
            <b-form-input type="number" v-model="new_quantity" placeholder="1?"></b-form-input>
        </b-col>

        <b-col sm="4">
            <b-form-input type="number" v-model="new_length" placeholder="100?"></b-form-input>
        </b-col>

        <b-col sm="4">
            <b-button @click="$emit('addRow', {quantity: new_quantity, length: new_length})">
                Add
            </b-button>
        </b-col>
    </b-row>
</template>
<script>
    export default {
        name: 'TargetInput',
        data: function () {
            return {
                new_length: (Math.ceil(Math.random() * 100)) * 10,
                new_quantity: (Math.ceil(Math.random() * 3)),
            }
        }
    }
</script>
