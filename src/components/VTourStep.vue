<template>
  <div ref="__vt_step" class="__vt_step">
    <div class="h4">
      {{ title }}
    </div>
    <div class="text">
      {{ description }}
    </div>
    <div class="card-action">
      <button
        @click="$emit('previous')"
        class="__vt_btn-primary"
        v-show="!isFirst"
      >
        Previous
      </button>
      <button
        @click="$emit('restart')"
        class="__vt_btn-primary"
        v-show="isLast"
      >
        Restart
      </button>
      <button @click="$emit('finish')" class="__vt_btn-primary" v-show="isLast">
        Finish
      </button>
      <button
        @click="$emit('next')"
        class="__vt_btn-primary"
        v-show="isFirst || !isLast"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    title: String,
    default: '',
  },
  isFirst: {
    type: Boolean,
    default: false,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['next', 'previous', 'restart', 'finish'])

const __vt_step = ref(null)

defineExpose({
  __vt_step,
})
</script>
<style scoped lang="scss">
.__vt_step {
  position: fixed;
  transition: 160ms;
}
</style>
