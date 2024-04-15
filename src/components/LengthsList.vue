<template>
    <b-list-group v-if="result !== null">
        <b-list-group-item
            v-for="(entry, id) in result.layout"
            :key="id"
        >
            <b-progress
                :max="entry.stock.length"
                height="2.5rem"
            >
                <template v-for="(cut, index) in entry.cuts">
                    <b-progress-bar
                        :key="index"
                        :value="cut.length"
                        class="bar_label"
                        show-value
                        variant="secondary"
                    >
                        <span>{{ cut.length }}</span>
                        <span v-if="cut.name" class="bar_label_name">{{ cut.name }}</span>
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
