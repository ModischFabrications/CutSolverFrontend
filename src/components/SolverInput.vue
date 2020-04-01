<template>
    <div id="solver-input" class="solver_input">
        <h2>Input</h2>

        <b-row>
            <b-col sm="2">
                <label for="input_max_length">Maximum Length:</label>
            </b-col>
            <b-col sm="2">
                <!-- add validation and set state accordingly -->
                <b-form-input id="input_max_length" type="number" :state="false" v-model="job.max_length" min="1"
                              max="9999" placeholder="Enter maximum length"></b-form-input>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="2">
                <label for="input_cut_width">Cut width:</label>
            </b-col>
            <b-col sm="2">
                <!-- relative validation? -->
                <b-form-input id="input_cut_width" type="number" :state="false" v-model="job.cut_width" min="0"
                              max="input_max_length.value/10"
                              placeholder="Enter cutting width"></b-form-input>
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
            job: {
                type: Object,
                default: testjob
                // add validator for json scheme
            }
        },
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