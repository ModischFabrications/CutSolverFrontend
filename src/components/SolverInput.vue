<template>
    <div id="solver-input" class="solver_input">
        <h2>Input</h2>

        <b-row>
            <b-col sm="6">
                <b-form-group
                        ref="grp_max_length"
                        label="Enter the maximum length"
                        label-for="input_max_length"
                        invalid-feedback="Length needs to be between 1 and 9999"
                        :state="(max_length >= 1 && max_length <= 9999)"
                >
                    <!-- TODO fix state transfer, somehow input won't be set by group-->
                    <!-- :state="$refs['grp_max_length'].state"-->
                    <b-form-input id="input-max_length" type="number" min=2 v-model="max_length"
                                  placeholder="check your supplier"></b-form-input>
                </b-form-group>
            </b-col>

            <b-col sm="6">
                <b-form-group
                        ref="grp_cut_width"
                        label="Enter the cutting width"
                        label-for="input_cut_width"
                        invalid-feedback="Length needs to be between 0 and max-length/10"
                        :state="(cut_width && cut_width >= 0 && cut_width <= max_length/10)"
                >
                    <!-- :state="$refs['grp_cut_width'].state"-->
                    <b-form-input id="input_cut_width" type="number" min=0 v-model="cut_width"
                                  placeholder="measure a cut"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- resize columns -->
        <b-table id="table_input" sticky-header=true hover bordered :items="target_sizes" primary-key="id"
                 :fields="[{key: 'quantity', sortable:true}, {key: 'length', sortable:true}, {key: 'delete', label: ''}]"
                 sort-by="quantity" sort-desc :tbody-transition-props="{name: 'flip-list'}">
            <template v-slot:cell(quantity)="row">
                <!-- TODO: validator? Correct/ignore wrong-->
                <b-form-input type="number" lazy v-model="row.item.quantity" min=1 placeholder="1?"></b-form-input>
            </template>
            <template v-slot:cell(length)="row">
                <b-form-input type="number" lazy v-model="row.item.length" min=1 placeholder="100?"></b-form-input>
            </template>
            <template v-slot:cell(delete)="row">
                <!-- TODO icon, minimum width -->
                <b-button @click="deleteRow(row.item.id)">[x]</b-button>
            </template>

            <!-- add interactive third row with size? -->
            <!-- https://bootstrap-vue.js.org/docs/components/progress -->
            <!-- [=======|.......] -->
        </b-table>

        <TargetInput v-on:addRow="addRow($event)"/>
    </div>
</template>

<script>
    // default values
    import {Job} from "@/components/data/Job";
    import json_testjob from "../tests/data/testjob.json"
    import TargetInput from "@/components/TargetInput";

    export default {
        name: "SolverInput",
        components: {TargetInput},
        data: function () {
            return {
                // other idea for default values?
                max_length: json_testjob.max_length,
                cut_width: json_testjob.cut_width,
                target_sizes: this.addIndex(json_testjob.target_sizes),
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
            addIndex(array) {
                let iIndex = 0;
                array.forEach(row => row.id = iIndex++);
                return array;
            },
            addRow(target) {
                target.id = this.target_sizes.length;
                this.target_sizes.push(target);
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

    .digit_input {
        width: 4.5em;
    }

    .three_digit_input {
        width: 5.5em;
    }

    table#table_input .flip-list-move {
        /* TODO fix transition: https://bootstrap-vue.js.org/docs/components/table/#table-body-transition-support */
        transition: transform 1s;
    }
</style>
