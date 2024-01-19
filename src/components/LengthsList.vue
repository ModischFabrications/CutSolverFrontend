<template>
    <b-list-group v-if="result !== null">
        <b-list-group-item
            v-for="(stock, id) in result.lengths"
            :key="id"
        >
            <b-progress
                :max="maxLength"
                height="2.5rem"
            >
                <template v-for="(length, index) in stock">
                    <b-progress-bar
                        :key="index"
                        :value="length[0]"
                        class="bar_label"
                        show-value
                        variant="secondary"
                    >
                        <span>{{ length[0] }}</span>
                        <span class="bar_label_name">{{ length[1] }}</span>
                    </b-progress-bar>
                    <b-progress-bar
                        :key="-1 - index"
                        :value="cutWidth"
                        striped
                        variant="dark"
                    />
                </template>
            </b-progress>
        </b-list-group-item>
    </b-list-group>
</template>
<script>
import { Result } from "@/components/data/Result";

export default {
  name: "LengthsList",
  props: {
    // use internal job for values
    maxLength: {
      type: Number,
      required: true,
    },
    cutWidth: {
      type: Number,
      required: true,
    },
    result: {
      type: Result,
      required: true,
    },
  },
};
</script>
<style scoped>
.bar_label {
  font-size: large;
  padding-top: 0.2rem;
  flex-direction: column;
  justify-content: space-around;
}
.bar_label_name {
  font-size: 0.75rem;
}
</style>
