<template>
    <div id="solver-input" class="solver_input">
        <h2>Input</h2>

        <b-row>
            <b-col cols="6">
                <b-form-group
                        ref="grp_max_length"
                        label="Maximum length"
                        label-for="input_max_length"
                        invalid-feedback="Length needs to be between 1 and 9999"
                        :state="validLength(max_length) ? null : false"
                >
                    <b-form-input id="input-max_length" type="number" min=2 v-model="max_length"
                                  placeholder="check your supplier"
                                  :state="validLength(max_length) ? null : false"></b-form-input>
                </b-form-group>
            </b-col>

            <b-col cols="6">
                <b-form-group
                        ref="grp_cut_width"
                        label="Cutting width"
                        label-for="input_cut_width"
                        invalid-feedback="Width needs to be between 0 and max-length/10"
                        :state="validCut(cut_width) ? null : false"
                >
                    <b-form-input id="input_cut_width" type="number" min=0 v-model="cut_width"
                                  placeholder="measure a cut"
                                  :state="validCut(cut_width) ? null : false"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- resize columns -->
        <b-table id="table_input" hover bordered :items="target_sizes" primary-key="id"
                 :fields="[{key: 'quantity', sortable:true}, {key: 'length', sortable:true}, {key: 'delete', label: ''}]"
                 sort-by="quantity" sort-desc :tbody-transition-props="{name: 'flip-list'}">
            <!-- foot-variant="light" for different style -->
            <template v-slot:head(delete)>
                <b-button class="del_column" @click="target_sizes = []" v-b-tooltip.hover title="Clear table">
                    <b-icon-trash-fill></b-icon-trash-fill>
                </b-button>
            </template>
            <template v-slot:cell(quantity)="row">
                <b-form-input type="number" lazy v-model="row.item.quantity" min=1 placeholder="1?"
                              :state="validQuantity(row.item.quantity) ? null : false"></b-form-input>
            </template>
            <template v-slot:cell(length)="row">
                <b-form-input type="number" lazy v-model="row.item.length" min=1 placeholder="100?"
                              :state="validLength(row.item.length) ? null : false"></b-form-input>
            </template>
            <template v-slot:cell(delete)="row">
                <b-button @click="deleteRow(row.item.id)" v-b-tooltip.hover title="Remove entry">
                    <b-icon-backspace-fill></b-icon-backspace-fill>
                </b-button>
            </template>

            <!-- TODO extract into component (not trivial, component can't have multiple root children) -->
            <template v-slot:custom-foot>
                <b-th>
                    <b-form-input type="number" v-model="new_quantity" min=1 placeholder="enter new quantity"
                                  @keydown.enter="addRow({quantity: new_quantity, length: new_length})"></b-form-input>
                </b-th>

                <b-th>
                    <b-form-input type="number" v-model="new_length" min=1 placeholder="enter new length"
                                  @keydown.enter="addRow({quantity: new_quantity, length: new_length})"></b-form-input>
                </b-th>

                <b-th>
                    <b-button :disabled="!(new_quantity > 0 && new_length > 0)" v-b-tooltip.hover title="Add entry"
                              @click="addRow({quantity: new_quantity, length: new_length})">
                        <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
                    </b-button>
                </b-th>
            </template>

            <!-- add interactive third row with size? -->
            <!-- https://bootstrap-vue.js.org/docs/components/progress -->
            <!-- [=======|.......] -->
        </b-table>

    </div>
</template>

<script>
    // default values
    import {Job} from "@/components/data/Job";
    import json_testjob from "../tests/data/testjob.json"
    import validators from "@/components/data/validators";

    export default {
        name: "SolverInput",
        mixins: [validators],
        data: function () {
            return {
                // other idea for default values?
                max_length: json_testjob.max_length,
                cut_width: json_testjob.cut_width,
                target_sizes: this.addIndex(json_testjob.target_sizes),

                new_quantity: '',
                new_length: ''
            }
        },
        computed: {
            // better idea to return this component state as collection"?
            job: function () {
                // TODO: this should return component state instead, but my ideas did not work
                return new Job(json_testjob.max_length, json_testjob.cut_width, json_testjob.target_sizes);
            },
            valid: function () {
                return (this.$refs["grp_max_length"].state &&
                    this.$refs["grp_cut_width"].state)
            }
        },
        methods: {
            validCut(width) {
                return (width !== '' && width >= 0 && width <= this.max_length / 10);
            },
            addIndex(array) {
                let iIndex = 0;
                array.forEach(row => row.id = iIndex++);
                return array;
            },
            addRow(target) {
                target.id = this.target_sizes.length;
                this.target_sizes.push(target);

                this.new_quantity = '';
                this.new_length = '';
            },
            deleteRow(row) {
                let index = this.target_sizes.findIndex(element => (element.id === row));
                this.target_sizes.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
    .solver_input {
        /*border: 2px solid grey;*/
        /*border-radius: 8px;*/
        /*padding: 8px;*/
        margin: 16px;
    }

    .del_column {
        /* TODO: shrink cell of table, make button square */
        width: 3em;
    }

    table#table_input .flip-list-move {
        /* TODO fix transition: https://bootstrap-vue.js.org/docs/components/table/#table-body-transition-support */
        transition: transform 1s;
    }
</style>
