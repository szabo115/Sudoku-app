<script setup>
import { ref, watch, defineEmits } from 'vue';

const emit = defineEmits(['generate', 'reset', 'updateDifficulty']);

const selectedDifficulty = ref('easy');

// Whenever the radio selection changes, notify the parent
watch(selectedDifficulty, (newVal) => {
  emit('updateDifficulty', newVal);
});

function onGenerate() {
  emit('generate')
}

function onReset() {
  emit('reset')
}

//TODO: - Implement the solve function
//      - Compare the progress to the stored solution
//      - Blink the correct cells with green???
/*function onSolve() {
  emit('solve')
}*/
</script>

<template>
  <div class="controls-bar">
    <button @click="onGenerate">Generate Puzzle</button>
    <button @click="onReset">Reset Grid</button>
    <!--<button @click="onSolve">Solve Puzzle</button>-->
    <form class="radio-button">
      <label>
        <input type="radio" name="difficulty" value="easy" v-model="selectedDifficulty" /> Easy
      </label>
      <label>
        <input type="radio" name="difficulty" value="medium" v-model="selectedDifficulty" /> Medium
      </label>
      <label>
        <input type="radio" name="difficulty" value="hard" v-model="selectedDifficulty" /> Hard
      </label>
    </form>
  </div>
</template>

<style scoped>
.controls-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 30px;
}
button {
  padding: 10px;
}
.radio-button {
  flex-basis: 100%;
}
</style>