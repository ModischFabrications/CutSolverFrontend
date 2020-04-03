<template>
    <div id="solver-input" class="solver_input">
        <h2>Input</h2>

        <b-row>
            <b-col sm="3">
                <b-form-group
                        id="grp_max_length"
                        label="Enter the maximum length"
                        label-for="input_max_length"
                        invalid-feedback="Length needs to be between 1 and 9999"
                        :state="(max_length >= 1 && max_length <= 9999)"
                >
                    <!-- fix state transfer, somehow input won't be set by group-->
                    <b-form-input id="input-max_length" v-model="max_length" :state="state" trim></b-form-input>
                </b-form-group>
            </b-col>

            <b-col sm="3">
                <b-form-group
                        id="cut_width"
                        label="Enter the cutting width"
                        label-for="input_cut_width"
                        invalid-feedback="Length needs to be between 0 and max-length/10"
                        :state="(cut_width >= 0 && cut_width <= max_length/10)"
                >
                    <b-form-input id="input-cut_width" v-model="cut_width" :state="state" trim></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>

        <b-table sticky-header=true hover outlined :items="job.target_sizes" :fields="['quantity', 'length']">
            <!--            <template v-slot:cell(amount)="amount">
                            <b-form-input type="number" v-model="amount"></b-form-input>
                        </template>-->
            <!-- add interactive third row with size -->
            <!-- [=======|.......] -->

            <!-- make table modifiable -->
            <!-- https://codesandbox.io/s/modern-http-n293u-->

            <!-- pull to reorder -->
            <!-- [Add a new size] -->
        </b-table>
    </div>
</template>

<script>
    // testjob.target_sizes
    import testjob from "../tests/data/testjob.json"

    export default {
        name: "SolverInput",
        props: {
            // nothing...
        },
        data: function () {
            return {
                max_length: testjob.max_length,
                cut_width: testjob.cut_width,
                target_sizes: testjob.target_sizes
            }
        },
        computed: {
            job: function () {
                return {
                    "max_length": this.max_length,
                    "cut_width": this.cut_width,
                    "target_sizes": this.target_sizes
                }
            }
        }
    }
</script>

<!-- no idea why borders are broken -->
<style scoped>
    .solver_input {
        border: blueviolet;
        border-radius: 8px;
        padding: 16px;
    }
</style>