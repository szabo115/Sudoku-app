<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import SudokuCell from './SudokuCell.vue'
import { useSudokuValidation } from '../composables/useSudokuValidation.js'

const props = defineProps({
  puzzle: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['grid-update']);
const userGrid = ref(Array(9).fill().map(() => Array(9).fill(0)));
const cellValidity = ref(Array(9).fill().map(() => Array(9).fill(true)));
const cellToShake = ref(Array(9).fill().map(() => Array(9).fill(false)));
const { isMoveValid } = useSudokuValidation(userGrid, cellToShake);

watch(
  () => props.puzzle,
  (newPuzzle) => {
    if (newPuzzle && newPuzzle.length === 9) {
      userGrid.value = newPuzzle.map(row => [...row])
    }
  }, { immediate: true }
)

function updateCell(row, col, newValue) {
  userGrid.value[row][col] = newValue
  emit('grid-update', userGrid.value)
}

function checkValidity(row, col, val) {
  cellValidity.value[row][col] = isMoveValid(row, col, val);
}
</script>

<template>
  <div class="sudoku-board">
    <div v-for="(row, rowIndex) in userGrid" :key="rowIndex" class="sudoku-row">
      <SudokuCell
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :value="cell"
        :isLocked="props.puzzle[rowIndex][colIndex] !== 0"
        :isValid="cellValidity[rowIndex][colIndex]"
        :toShake="cellToShake[rowIndex][colIndex]"
        @update="updateCell(rowIndex, colIndex, $event)"
        @checkValidity="checkValidity(rowIndex, colIndex, $event)" />
    </div>
  </div>
</template>

<style scoped>
.sudoku-board {
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  width: 600px;
  height: 600px;
  border: 5px solid #333;
  margin: 0 auto;
  box-shadow: 0 0 35px rgba(0,0,0,0.8);
}
.sudoku-row {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}
</style>