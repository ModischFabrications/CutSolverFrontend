<template>
    <b-row>
        <b-col sm="4">
            <b-form-input type="number" v-model="new_quantity" min=1 placeholder="1?"></b-form-input>
        </b-col>

        <b-col sm="4">
            <b-form-input type="number" v-model="new_length" min=1 placeholder="100?"></b-form-input>
        </b-col>

        <b-col sm="4">
            <b-button :disabled="!(new_quantity > 0 && new_length > 0)"
                      @click="$emit('addRow', {quantity: new_quantity, length: new_length})">
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
                new_quantity: 1, //(Math.ceil(Math.random() * 3)),
                new_length: (Math.ceil(Math.random() * 100)) * 10,
            }
        }
    }
</script>
