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
                    <!-- fix state transfer, somehow input won't be set by group-->
                    <!-- :state="$refs['grp_max_length'].state"-->
                    <b-form-input id="input-max_length" type="number" trim v-model="max_length"
                    ></b-form-input>
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
                    <b-form-input id="input_cut_width" type="number" trim v-model="cut_width"
                    ></b-form-input>
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
    import testjob from "../tests/data/testjob.json"

    function Job(max_length, cut_width, target_sizes) {
        // other idea for default values?
        this.max_length = max_length;
        this.cut_width = cut_width;
        this.target_sizes = target_sizes;
    }

    export default {
        name: "SolverInput",
        props: {
            // nothing...
        },
        data: function () {
            return {
                // other idea for default values?
                max_length: testjob.max_length,
                cut_width: testjob.cut_width,
                target_sizes: testjob.target_sizes
            }
        },
        computed: {
            // having a better idea return "component state"?
            job: function () {
                return new Job(testjob.max_length, testjob.cut_width, testjob.target_sizes);
            },
            valid: function () {
                return (this.$refs["grp_max_length"].state &&
                    this.$refs["grp_cut_width"].state)
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