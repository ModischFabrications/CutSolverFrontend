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
                    :state="validLength(max_length, max_length) ? null : false"
                    invalid-feedback="Length needs to be between 1 and 9999"
                    label="Maximum length"
                    label-for="input_max_length"
                >
                    <!-- type manages input values, number typecasts entry into number -->
                    <b-form-input
                        id="input-max_length"
                        v-model="max_length"
                        :state="validLength(max_length, max_length) ? null : false"
                        min="2"
                        number
                        placeholder="check your supplier"
                        type="number"
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
                        number
                        placeholder="measure a cut"
                        type="number"
                    />
                </b-form-group>
            </b-col>
        </b-row>

        <!-- resize columns -->
        <DataTable
            ref="main_output"
            :default-target-sizes="defaultTargetSizes"
            :max-length="max_length"
            :target_sizes.sync="target_sizes"
        />
    </div>
</template>

<script>
    // default values
    import {Job} from "@/components/data/Job";
    import json_testjob from "../tests/data/testjob.json"
    import validators from "@/components/data/validators";
    import DataTable from "@/components/DataTable";

    export default {
        name: "SolverInput",
        components: {DataTable},
        mixins: [validators],
        data: function () {
            return {
                // other idea for default values?
                max_length: json_testjob.max_length,
                cut_width: json_testjob.cut_width,
                defaultTargetSizes: this.sizes_as_list(json_testjob.target_sizes),
                target_sizes: []
            }
        },
        computed: {
            job() {
                return new Job(Number(this.max_length), Number(this.cut_width), this.target_sizes);
            },
            valid() {
                return this.job.valid();
            }
        },
        methods: {
            sizes_as_list(target_sizes) {
                return target_sizes.map((size) => ({"name": size.name, "quantity": parseInt(size.quantity), "length": parseInt(size.length)}));
            },
            validCut(width) {
                return (Number.isInteger(width) && width >= 0 && width <= this.max_length / 10);
            },
        }
    }
</script>

<style scoped>
    .solver_input {
        padding: 8px;
    }
</style>
