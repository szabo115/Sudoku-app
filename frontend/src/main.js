import { createApp } from 'vue';
import App from './App.vue';
import sudokuInput from './directives/sudokuInput';
import shakeableCell from './directives/shakeableCell';

const app = createApp(App);
app.directive('sudoku-input', sudokuInput);
app.directive('shakeable-cell', shakeableCell);
app.mount('#app');