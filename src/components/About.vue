<template>
    <b-modal id="about-modal" centered scrollable title="About" header-bg-variant="light" hide-footer>
        <!-- might need to be split into different parts or collapses instead... -->
        <!-- Markdown content instead? Writing HTML is pretty cumbersome -->
        <h5>What it is</h5>
        <p>This service collects your input, sends it to a big calculator of mine, allows it to calculate for a while
            and displays the received result to you.
        </p>
        <p><i>Could this be done on this website, on my device, in the background?</i> Probably,
            that might even be faster, but the calculator was here first ¯\_(ツ)_/¯ </p>
        <p><i>Do you steal my valuable data and sell it to illegal drug dealers on the black market?</i> No, is that
            something that people do? Do I need to worry about that? To be honest, I wouldn't know what to do with it,
            if you have a nice welding project send me an email instead so I can look at your fine work.</p>

        <h5>Why it exists</h5>
        <p>This project was born out of the need to cut lengths of steel tubing. Ordering everything
            pre-cut is easy, but costs at least 30% more. I had everything I needed at home, but I needed to know how
            many stock bars to order and where to cut them. I finished that project years ago, but the problem keeps
            arising, which is why I finally caved in and developed this project. </p>

        <p>Look at more things I do: </p>
        <!-- IG, Thingiverse, Website, XING?, ... -->

        <p>I will be forever grateful if you donate something to keep this website up, right now I am
            paying around 5€/month to host this service. </p>
        <!-- donate -->

        <!-- github link -->
        <!-- make icon: fontawesome? -->
        <!-- <b-nav-item href="https://github.com/ModischFabrications/CutSolverFrontend">GitHub</b-nav-item>-->
        <p>Check out the code if you want to see how I made it, you are welcome to add to it if you see any
            improvements :) </p>

        <p>You can send also jobs to my backend all by yourself, see ## . Please don't abuse or break it. Feel free to
            send an issue or merge request or something if you find a vulnerability.</p>
    </b-modal>
</template>

<script>
    export default {
        name: "About",

    }
</script>

<style scoped>

</style>