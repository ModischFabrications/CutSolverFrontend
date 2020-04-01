<template>
    <div id="solver-input">
        <span class="border border-dark"></span>
        <p>This will eventually be an input field</p>
        <table>
            <tr>
                <th>A1</th>
                <th>A2</th>
            </tr>
            <tr>
                <th>B1</th>
                <th>B2</th>
            </tr>
        </table>
        <p> max size = 1500</p>
        <p>cut width = 2</p>
        <p> quantity size img_size</p>
        <!-- pull to reorder -->
        <p> # 350 4 [=======|.......]</p>
        <p> # 150 1 [==|............]</p>
        <p> # 500 12 [============|..] </p>
        <p>[Add a new size]</p>
        <!-- no idea how to visualize that -->
    </div>
</template>

<script>
    // testjob.target_sizes

    export default {
        name: "SolverInput",
        props: {
            sizes: Object
        }
    }
</script>

<style scoped>

</style>