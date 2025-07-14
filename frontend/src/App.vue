<script setup>
import { ref, nextTick } from 'vue';
import ControlsBar from './components/ControlsBar.vue';
import SudokuBoard from './components/SudokuBoard.vue';
import { fetchPuzzle } from './composables/SudokuService.js';
import FooterComponent from './components/FooterComponent.vue';

const originalPuzzle = ref([]);
const puzzle = ref([]);
const solution = ref([]);
const difficulty = ref('easy');
const puzzleReady = ref(false);

//Handling the 'generate' emit from ControlsBar
async function generatePuzzle(){
  puzzleReady.value = false;
  try {
    const data = await fetchPuzzle(difficulty.value);
    
    puzzle.value = data.puzzle.map(row => row.map(cell => Number(cell)));
    originalPuzzle.value = puzzle.value.map(row => row.map(cell => cell));

    solution.value = data.solution.map(row => row.map(cell => Number(cell)));

    puzzleReady.value = true;
  } catch (error) {
    console.error('Failed to generate puzzle:', error);
  }
}

//Handling the 'reset' emit from ControlsBar
const resetPuzzle = function() {
  puzzle.value = originalPuzzle.value.map(row => row.map(cell => cell));
  nextTick(() => {
    //Remove every 'invalid' class from cells
    document.querySelectorAll('.cell.invalid').forEach(el => {
      el.classList.remove('invalid');
    });
  });
}

//Handling the 'updateDifficulty' emit from ControlsBar
function updateDifficulty(newVal) {
  difficulty.value = newVal;
}

//TODO: - Implement the 'solve' emit handler from ControlsBar

</script>

<template>
  <div class="app-container">
    <div class="main-content">
      <ControlsBar @generate="generatePuzzle" @reset="resetPuzzle" @updateDifficulty="updateDifficulty" />
      <SudokuBoard v-if="puzzleReady" :puzzle="puzzle" />
    </div>
    <FooterComponent />
  </div>
</template>

<style>
#app {
  font-family: "Roboto Mono", monospace;
  text-align: center;
  color: #2c3e50;
}
.app-container {
  display: flex;
  flex-direction: column;
  height: 100svh;
}
.main-content {
  flex: 1;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}
</style>