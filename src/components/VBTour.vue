<template>
  <v-b-tour-step
    v-if="!__vt_isfinished"
    ref="__vt_step"
    :title="currentStep.title"
    :description="currentStep.description"
    :is-first="isFirst"
    :is-last="isLast"
    :class="stepClass"
    @restart="restartSteps"
    @next="nextStep"
    @previous="prevStep"
    @finish="finishSteps"
  />
</template>
<script>
export default {
  name: 'VTour',
}
</script>
<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted, toRef } from 'vue'
import { autoUpdate, computePosition } from '@floating-ui/dom'
import MoveTo from 'moveto'

import VBTourStep from './VBTourStep.vue'
import * as constants from '@/shared/constants'
import { logger } from '@/shared/logger'

const props = defineProps({
  startPoint: {
    type: Number,
    default: 0,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  tour: {
    type: Array,
    default: () => [],
  },
  debugMode: {
    type: Boolean,
    default: false,
  },
  scrollToStep: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['updated'])

const indexStep = ref(0)
const listTour = toRef(props, 'tour')
const __vt_isfinished = ref(false)
const __vt_step = ref(null)
const __vt_garbage = ref(null)
const moveTo = new MoveTo(constants.MOVETO_OPTIONS)

const currentStep = computed(() => listTour.value[indexStep.value])
const isFirst = computed(() => indexStep.value === 0)
const isLast = computed(() => indexStep.value === listTour.value.length - 1)
const stepClass = computed(() => [
  {
    'vt__animation-highlight': !props.debugMode && props.highlight,
    rounded: props.rounded,
    outlined: props.outlined,
  },
  'vt__card-step',
])

function __buildStatus(status) {
  return constants.DEFAULT_STATUS[status] || constants.DEFAULT_STATUS['FINISH']
}

function prevStep() {
  if (indexStep.value === 0) return

  indexStep.value -= 1
  emits('updated', __buildStatus('PREV'))
}

function nextStep() {
  if (indexStep.value === listTour.value.length - 1) {
    indexStep.value = 0
    return
  }

  indexStep.value += 1
  emits('updated', __buildStatus('NEXT'))
}

function restartSteps() {
  indexStep.value = 0
  if (__vt_isfinished.value) {
    __vt_isfinished.value = false
  }
  emits('updated', __buildStatus('RESTARTED'))
}

function finishSteps() {
  __vt_isfinished.value = true
  emits('updated', __buildStatus('FINISH'))
}

function notifyComputePosition(reference, floater, optionsPosition) {
  const options = Object.assign(constants.DEFAULT_OPTIONS, optionsPosition)
  const updateFloater = ({ x, y }) => {
    const axisPositions = { top: `${y}px`, left: `${x}px` }

    Object.assign(floater.style, axisPositions)
  }

  if (__vt_isfinished.value) return
  if (props.scrollToStep) {
    moveTo.move(reference)
  }
  __vt_garbage.value = autoUpdate(reference, floater, () =>
    computePosition(reference, floater, options).then(updateFloater)
  )
  emits('updated', __buildStatus('NEXT'))
}

function autoUpdateWrapper() {
  if (!__vt_step.value?.__vt_step) return

  const floater = __vt_step.value.__vt_step
  const currentItem = document.querySelector(currentStep.value.ref)

  notifyComputePosition(currentItem, floater, {
    placement: currentStep.value.position,
  })
}

defineExpose({
  currentStep: indexStep,
  prevStep,
  nextStep,
  restartSteps,
  finishSteps,
})

watchEffect(() => {
  if (indexStep.value >= 0) {
    autoUpdateWrapper()
  }
})

onMounted(() => {
  if (props.startPoint > props.tour.length) {
    props.debugMode &&
      logger(
        'warn',
        '`start-point` property is invalid - is greater than tour length, zero will be used instead'
      )
    indexStep.value = 0
    return
  }
  indexStep.value = props.startPoint
})

onUnmounted(() => {
  if (__vt_garbage.value) {
    __vt_garbage.value()
  }
})
</script>
<style scoped>
:global(:root) {
  --vt-primary-color: #2485bd;
  --vt-success-color: #21ba45;
  --vt-success-color-hovered: #169935;
  --vt-error-color: #c10015;
  --vt-secondary-color: #474747;
  --vt-deactive-color: #aeaeae;

  --vt-primary-color-rgb: 36, 133, 189;
  --vt-step-bg-color: #fff;

  --vt-text-primary: var(--vt-primary-color);
  --vt-text-secondary: #4d4d4d;
  --vt-text-white: #f8f8f8;

  --vt-base-space: 16px;
  --vt-radious-size: 8px;
}
</style>
