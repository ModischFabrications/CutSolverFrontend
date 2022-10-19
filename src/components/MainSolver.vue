<template>
    <b-container
        fluid="true"
        class="fix_fluid"
    >
        <b-row
            align-h="center"
        >
            <b-col xl="5">
                <SolverInput ref="input"/>
            </b-col>

            <b-col
                xl="*"
                align-self="center"
            >
                <!-- centered and square on desktop, long bar button on mobile? -->
                <b-button
                    id="solve-button"
                    class="solve_button"
                    pill
                    size="lg"
                    type="submit"
                    @click="startSolving"
                >
                    Solve
                </b-button>
            </b-col>

            <b-col
                xl="5"
            >
                <!-- output field for json API answer, hidden by default -->
                <SolverOutput
                    ref="output"
                />
            </b-col>
            <!-- [x] live update ?-->
        </b-row>
    </b-container>
</template>
<script>
import SolverInput from "@/components/SolverInput"
import SolverOutput from "@/components/SolverOutput"

export default {
  name: 'MainSolver',
  components: {SolverInput, SolverOutput},
  props: {
    startSolving: {}
  }
}
</script>
<style>

.solve_button {
  margin: 16px;
}

.fix_fluid {
  padding-left: 15px;
  padding-right: 15px;
}

.fluid-container.footer > *:last-child {
  padding: 4rem 2rem 2rem 2rem;
  margin-bottom: 0;
  color: #a1a1a1;
}
</style>