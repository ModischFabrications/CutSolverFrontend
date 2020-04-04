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
                    <b-form-input id="input-max_length" type="number" trim v-model="max_length"></b-form-input>
                </b-form-group>
            </b-col>

            <b-col sm="6">
                <b-form-group
                        ref="grp_cut_width"
                        label="Enter the cutting width"
                        label-for="input_cut_width"
                        invalid-feedback="Length needs to be between 0 and max-length/10"
                        :state="(cut_width >= 0 && cut_width <= max_length/10)"
                >
                    <!-- :state="$refs['grp_cut_width'].state"-->
                    <b-form-input id="input_cut_width" type="number" trim v-model="cut_width"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>

        <b-table sticky-header=true hover outlined :items="target_sizes" :fields="['quantity', 'length']">
            <!--            <template v-slot:cell(amount)="amount">
                            <b-form-input type="number" v-model="amount"></b-form-input>
                        </template>-->
            <!-- add interactive third row with size -->
            <!-- https://bootstrap-vue.js.org/docs/components/progress -->
            <!-- [=======|.......] -->

            <!-- make table modifiable -->
            <!-- https://codesandbox.io/s/modern-http-n293u-->

            <!-- pull to reorder -->
            <!-- [Add a new size] -->
        </b-table>
    </div>
</template>

<script>
    // default values
    import {Job} from "@/components/data/Job";
    import json_testjob from "../tests/data/testjob.json"

    export default {
        name: "SolverInput",
        data: function () {
            return {
                // other idea for default values?
                max_length: json_testjob.max_length,
                cut_width: json_testjob.cut_width,
                target_sizes: json_testjob.target_sizes
            }
        },
        computed: {
            // better idea to return this component state as collection"?
            job: function () {
                // TODO: this should return component state, but my ideas did not work
                return new Job(json_testjob.max_length, json_testjob.cut_width, json_testjob.target_sizes);
            },
            valid: function () {
                return (this.$refs["grp_max_length"].state &&
                    this.$refs["grp_cut_width"].state)
            }
        }
    }
</script>

<style scoped>
    .solver_input {
        border: 2px solid grey;
        border-radius: 8px;
        padding: 8px;
        margin: 16px;
    }
</style>
