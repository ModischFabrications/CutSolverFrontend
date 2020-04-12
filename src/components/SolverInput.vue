<template>
    <div
        id="solver-input"
        class="solver_input"
    >
        <h2>Input</h2>

        <b-row>
            <b-col cols="6">
                <b-form-group
                    ref="grp_max_length"
                    :state="validLength(max_length) ? null : false"
                    invalid-feedback="Length needs to be between 1 and 9999"
                    label="Maximum length"
                    label-for="input_max_length"
                >
                    <b-form-input
                        id="input-max_length"
                        v-model="max_length"
                        :state="validLength(max_length) ? null : false"
                        min="2"
                        placeholder="check your supplier"
                        number
                    />
                </b-form-group>
            </b-col>

            <b-col cols="6">
                <b-form-group
                    ref="grp_cut_width"
                    :state="validCut(cut_width) ? null : false"
                    invalid-feedback="Width needs to be between 0 and max-length/10"
                    label="Cutting width"
                    label-for="input_cut_width"
                >
                    <b-form-input
                        id="input_cut_width"
                        v-model="cut_width"
                        :state="validCut(cut_width) ? null : false"
                        min="0"
                        placeholder="measure a cut"
                        number
                    />
                </b-form-group>
            </b-col>
        </b-row>

        <!-- resize columns -->
        <b-table
            id="table_input"
            :fields="[{key: 'quantity', sortable:true}, {key: 'length', sortable:true}, {key: 'delete', label: ''}]"
            :items="target_sizes"
            :tbody-transition-props="{name: 'flip-list'}"
            bordered
            hover
            primary-key="id"
            small
            sort-by="quantity"
            sort-desc
            tbody-tr-class="excel_row"
        >
            <template v-slot:head(delete)>
                <b-button
                    v-b-tooltip.hover
                    class="del_column"
                    title="Clear table"
                    @click="target_sizes = []"
                >
                    <!-- TODO: wrap with div to set minimal width, column width is determined by first entry -->
                    <b-icon-trash-fill/>
                </b-button>
            </template>
            <template v-slot:cell(quantity)="row">
                <b-form-input
                    v-model="row.item.quantity"
                    :state="validQuantity(row.item.quantity) ? null : false"
                    lazy
                    min="1"
                    placeholder="1?"
                    number
                />
            </template>
            <template v-slot:cell(length)="row">
                <b-form-input
                    v-model="row.item.length"
                    :state="validLength(row.item.length) ? null : false"
                    lazy
                    min="1"
                    placeholder="100?"
                    number
                />
            </template>
            <template v-slot:cell(delete)="row">
                <b-button
                    v-b-tooltip.hover
                    title="Remove entry"
                    @click="deleteRow(row.item.id)"
                >
                    <b-icon-backspace-fill/>
                </b-button>
            </template>

            <!-- TODO extract into component (not trivial, component can't have multiple root children) -->
            <template v-slot:custom-foot>
                <b-th>
                    <b-form-input
                        ref="input_new_quantity"
                        v-model="new_quantity"
                        min="1"
                        placeholder="enter new quantity"
                        number
                        @keydown.enter="addRow({quantity: new_quantity, length: new_length})"
                    />
                </b-th>

                <b-th>
                    <b-form-input
                        v-model="new_length"
                        min="1"
                        placeholder="enter new length"
                        number
                        @keydown.enter="addRow({quantity: new_quantity, length: new_length})"
                    />
                </b-th>

                <b-th>
                    <b-button
                        :disabled="!(new_quantity > 0 && new_length > 0)"
                        @click="addRow({quantity: new_quantity, length: new_length})"
                    >
                        <b-icon-plus-circle-fill/>
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
            job() {
                return new Job(Number(this.max_length), Number(this.cut_width), this.target_sizes);
            },
        },
        methods: {
            validCut(width) {
                return (Number.isInteger(width) && width >= 0 && width <= this.max_length / 10);
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
                this.$refs["input_new_quantity"].focus();
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
        padding: 16px;
    }

    .del_column {
        /* TODO: shrink cell of table, make button square */
        width: 3em;
    }

    .excel_row td input {
        background-color: #0000;
        border: none;
        border-radius: 0;
    }

    table#table_input .flip-list-move {
        /* TODO fix transition: https://bootstrap-vue.js.org/docs/components/table/#table-body-transition-support */
        transition: transform 1s;
    }
</style>
