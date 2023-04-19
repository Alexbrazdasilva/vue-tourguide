<template>
  <div ref="__vt_step" class="__vt_step">
    <div class="h4">
      {{ title }}
    </div>
    <div class="text">
      {{ description }}
    </div>
    <div class="actions">
      <div class="spacer"></div>
      <button
        @click="$emit('restart')"
        class="__vt_btn-secondary"
        v-show="isLast"
      >
        Restart
      </button>
      <button
        @click="$emit('previous')"
        class="__vt_btn-secondary"
        v-show="!isFirst"
      >
        Previous
      </button>
      <button
        @click="$emit('finish')"
        class="__vt_btn"
        :class="btnClassForLastStep"
        :disabled="isFirst"
      >
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
import { computed, ref } from 'vue'

const props = defineProps({
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

const btnClassForLastStep = computed(() =>
  props.isLast ? '__vt_btn-success' : '__vt_btn-secondary'
)

defineExpose({
  __vt_step,
})
</script>
<style scoped>
.__vt_step {
  position: fixed;
  max-width: 400px;
  width: 100%;
  transition: 160ms;
  background-color: var(--vt-step-bg-color);
  border-radius: var(--vt-radious-size);
  padding: calc(var(--vt-base-space) * 2) calc(var(--vt-base-space) * 1.25)
    calc(var(--vt-base-space) * 1.5);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

[class*='__vt_btn'] {
  cursor: pointer;
  padding: calc(var(--vt-base-space) * 0.5) calc(var(--vt-base-space) * 1.5);
  border: none;
  text-transform: uppercase;
  font-weight: 550;
  border-radius: 20px;
  transition: background 180ms;
}

[class*='__vt_btn']:hover {
  transition: background 120ms;
  background-color: rgba(0, 0, 0, 0.05);
}
[class*='__vt_btn']:disabled {
  color: var(--vt-deactive-color);
}

.__vt_btn-primary {
  background-color: var(--vt-primary-color);
  color: var(--vt-text-white);
  border: 1px solid transparent;
}
.__vt_btn-primary:hover {
  color: var(--vt-primary-color);
}

.__vt_btn-secondary {
  background-color: transparent;
  color: var(--vt-secondary-color);
  border: 1px solid var(--vt-deactive-color);
}

.__vt_btn-success {
  background-color: var(--vt-success-color);
  color: var(--vt-text-white);
}

.__vt_btn-success:hover {
  background-color: var(--vt-success-color-hovered);
}

.__vt_btn-primary:hover {
  border: 1px solid var(--vt-primary-color);
  background-color: rgba(var(--vt-primary-color-rgb), 0.05);
}

.spacer {
  flex-grow: 1;
}
.h4 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 520;
}
.text {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: normal;
  line-height: 1.5;
  color: var(--vt-text-secondary);
}
.actions {
  display: flex;
  width: 100%;
}

.actions [class*='__vt_btn'] {
  margin: 0 4px;
}
</style>
