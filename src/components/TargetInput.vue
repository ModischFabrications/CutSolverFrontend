<template>
    <b-row>
        <b-col cols="5">
            <b-form-input type="number" v-model="new_quantity" min=1 placeholder="1?"
                          :state="validQuantity(new_quantity) ? null : false"></b-form-input>
        </b-col>

        <b-col cols="5">
            <b-form-input type="number" v-model="new_length" min=1 placeholder="100?"
                          :state="validLength(new_length) ? null : false"></b-form-input>
        </b-col>

        <b-col class="del_column">
            <b-button :disabled="!(new_quantity > 0 && new_length > 0)"
                      @click="$emit('addRow', {quantity: new_quantity, length: new_length})">
                Add
            </b-button>
        </b-col>
    </b-row>
</template>

<script>
    import validators from "@/components/data/validators";

    export default {
        name: 'TargetInput',
        mixins: [validators],
        data: function () {
            return {
                new_quantity: 1, //(Math.ceil(Math.random() * 3)),
                new_length: (Math.ceil(Math.random() * 100)) * 10,
            }
        }
    }
</script>

<style scoped>
    /*
    TODO: equal sizes to table
    -> custom table footer instead?
     */
    .match_table {
        padding: 8px;
    }
</style>
