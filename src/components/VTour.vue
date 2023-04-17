<template>
  <div>
    <v-tour-step
      v-if="!__vt_isfinished"
      ref="__vt_step"
      :title="currentStep.title"
      :description="currentStep.description"
      :is-first="isFirst"
      :is-last="isLast"
      @restart="restartSteps"
      @next="nextStep"
      @previous="prevStep"
      @finish="finishSteps"
    />
  </div>
</template>
<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted, toRef } from 'vue'
import { autoUpdate, computePosition } from '@floating-ui/dom'
import MoveTo from 'moveto'

import VTourStep from './VTourStep.vue'
import * as constants from '@/shared/constants'
import { logger } from '@/shared/logger'

const props = defineProps({
  startPoint: {
    type: Number,
    default: 0,
  },
  tour: {
    type: Array,
    default: () => [],
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
  emits('updated', __buildStatus('RESTARTED'))
}

function finishSteps() {
  __vt_isfinished.value = true
  emits('updated', __buildStatus('FINISH'))
}

function notifyComputePosition(reference, floater, optionsPosition) {
  const options = Object.assign(constants.DEFAULT_OPTIONS, optionsPosition)
  const updateFloater = ({ x, y }) => {
    const position = {
      top: `${y}px`,
      left: `${x}px`,
    }

    Object.assign(floater.style, position)
  }

  if (!__vt_isfinished.value) {
    moveTo.move(reference)
    computePosition(reference, floater, options).then(updateFloater)
    emits('updated', __buildStatus('NEXT'))
  }
}

function autoUpdateWrapper() {
  if (!__vt_step.value?.__vt_step) return

  const floater = __vt_step.value.__vt_step
  const currentItem = document.querySelector(currentStep.value.ref)

  __vt_garbage.value = autoUpdate(currentItem, floater, () =>
    notifyComputePosition(currentItem, floater, {
      placement: currentStep.value.position,
    })
  )
}
watchEffect(() => {
  if (indexStep.value >= 0) {
    autoUpdateWrapper()
  }
})

onMounted(() => {
  if (props.startPoint > props.tour.length) {
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
