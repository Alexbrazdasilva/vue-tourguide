<template>
  <div>
    <div data-tour="1">1</div>
    <div data-tour="2">2</div>
    <div data-tour="3">3</div>
    <div data-tour="4">4</div>
    <div data-tour="5" class="right-bottom">5</div>
    <div data-tour="6">5</div>
    <div data-tour="7">7</div>
    <v-tour :tour="myTour" :start-point="6" />
  </div>
</template>
<script setup>
import VTour from '@/components/VTour.vue'
const myTour = [
  {
    ref: '[data-tour="1"]',
    position: 'top',
    title: 'Fooo',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="2"]',
    position: 'right-end',
    title: 'Lorem ipsum not dolot',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="3"]',
    position: 'left-start',
    title: 'Not dolot',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="4"]',
    position: 'left-end',
    title: 'Not dolot',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="5"]',
    position: 'bottom',
    title: 'Not dolot',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="6"]',
    position: 'right-end',
    title: 'Not dolot',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="7"]',
    position: 'top',
    title: 'Not dolot',
    description: 'lorem ipsum not dolot',
  },
]
</script>
<style scoped>
[data-tour] {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #2bf063;
  margin-bottom: 10em;
}
</style>
