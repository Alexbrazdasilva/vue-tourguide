<p align="center">
    <img width="180" src="https://raw.githubusercontent.com/Alexbrazdasilva/vue-tourguide/master/src/assets/bread_tour.svg" alt="Bread logo">
    <br />
    <br />
    <a href="https://npmjs.com/package/vue-breadcrumb-tour">
        <img src="https://badgen.net/npm/v/vue-breadcrumb-tour" alt="npm package" />
    </a>
</p>

# Vue breadcrumb tour

> User tour plugin for Vue JS

- 🎨 Customizable
- 📦 Light

_Vue breadcrumb tour_ works in Vue 3

## Installation

```bash
# or yarn
npm i vue-breadcrumb-tour
```

## Usage

```js
// main.js

import { VBTourPlugin } from 'vue-breadcrumb-tour'
import { createApp } from 'vue'

const app = createApp(App)

app.use(VBTourPlugin)
app.mount('#app')
```

In any components

```html
<template>
    <div>
        <div data-tour="first">First</div>
        <div id="second">Second</div>
        <div class="third">Third</div>
        <v-b-tour :tour="tourList" />
    </div>
</template>
<script setup>
// more code...
const tourList = [ // ref, ..., reactive, can also be used
  {
    ref: '[data-tour="first"]', // document.querySelector is being used under the hood
    position: 'right-start',
    title: 'First step',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '#second',
    position: 'right-end',
    title: 'Second step',
    description: 'lorem ipsum not dolot',
  },
  {
    ref: '.third',
    position: 'left',
    title: 'Third step',
    description: 'lorem ipsum not dolot',
  }
]

```

It is not necessary to start the tour on `onMounted` as this is already being done under the hood.
For cases where you need to perform basic operations, <v-b-tour /> exposes the following methods:

| Method                 | Description              |
| ---------------------- | ------------------------ |
| `prevStep(): void`     | Returns to previous step |
| `nextStep(): void`     | Advance to the next step |
| `restartSteps(): void` | Restart the tour         |
| `finishSteps(): void`  | End the tour             |
