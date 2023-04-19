<template>
  <div class="d-flex">
    <div data-tour="1" class="col-6">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta eaque modi
      eum, saepe suscipit quisquam laudantium perferendis accusantium cupiditate
      illo, expedita praesentium esse, commodi incidunt ipsa facilis beatae
      explicabo voluptates!
    </div>
    <div data-tour="2" class="col-6">
      <h3>Lorem ipsum</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        animi alias debitis nemo laudantium fugiat ullam, consectetur sequi
        iure, esse dolorum aperiam ab natus commodi, ex neque eveniet aut enim.
      </p>
    </div>
    <div data-tour="3" class="col-6">3</div>
    <div data-tour="4" class="col-6">4</div>
    <div data-tour="5" class="col-6">5</div>
    <div data-tour="6" class="col-6">5</div>
    <div data-tour="7" class="col-6">7</div>
    <button @click="$refs.tourWrapper.restartSteps()">Tutoriais</button>
    <v-tour
      :tour="myTour"
      ref="tourWrapper"
      scroll-to-step
      highlight
      rounded
      outlined
    />
  </div>
</template>
<script setup>
// import VTour from '@/components/VTour.vue'
import { ref } from 'vue'
const tourWrapper = ref(null)
const myTour = [
  {
    ref: '[data-tour="1"]',
    position: 'top',
    title: 'Primeira etapa',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="2"]',
    position: 'right-end',
    title: 'Segunda etapa',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        animi alias debitis nemo laudantium fugiat ullam, consectetur sequi
        iure, esse dolorum aperiam ab natus commodi, ex neque eveniet aut enim.`,
  },
  {
    ref: '[data-tour="3"]',
    position: 'left-start',
    title: 'Terceira etapa',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="4"]',
    position: 'left-end',
    title: 'Quarta etapa',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="5"]',
    position: 'bottom',
    title: 'Quinta etapa',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="6"]',
    position: 'right-end',
    title: 'Sexta etapa',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '[data-tour="7"]',
    position: 'top',
    title: 'Última etapa!',
    description: 'lorem ipsum not dolot',
  },
]
</script>
<style scoped>
[data-tour] {
  border: 1px solid #2bf063;
  margin-bottom: 10em;
}
.d-flex {
  display: flex;
  flex-wrap: wrap;
}
.col-6 {
  width: 50%;
  height: 70vh;
}
</style>
