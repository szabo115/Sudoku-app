<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  value: {
    type: [Number, String],
    required: true
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  isValid: {
    type: Boolean,
    default: true
  },
  toShake: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update', 'checkValidity']);

//Display blank in cells with 0
const displayValue = computed(() =>
  props.value === 0 || props.value === '' ? '' : String(props.value)
);

function handleInput(event) {
  const val = event.target.value;
  const num = parseInt(val);
  emit('update', isNaN(num) ? 0 : num);
  emit('checkValidity', num);
}
</script>

<template>
  <input
    v-if="!isLocked"
    v-sudoku-input="!isValid"
    v-shakeable-cell="toShake"
    class="cell editable"
    :value="displayValue"
    @input="handleInput"
    maxlength="1"
    pattern="[1-9]"
    autocomplete="off"
    inputmode="numeric"
  />
  <div
    v-else
    v-shakeable-cell="toShake"
    class="cell locked"
    >{{ displayValue }}
  </div>
</template>

<style scoped>
.cell {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2.8em;
  font-weight: 700;
  font-family: inherit;
  color: #333;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
/* Subgrid borders:----------------*/
.sudoku-row .cell:nth-child(3),
.sudoku-row .cell:nth-child(6),
.sudoku-row .cell:nth-child(9) {
  border-right: 3px solid #666;
}
.sudoku-row .cell:nth-child(1) {
  border-left: 3px solid #666;
}
.sudoku-row:nth-child(3) .cell,
.sudoku-row:nth-child(6) .cell,
.sudoku-row:nth-child(9) .cell {
  border-bottom: 3px solid #666;
}
.sudoku-row:nth-child(1) .cell {
  border-top: 3px solid #666;
}
/*-------------------------------*/
.editable {
  background-color: #f9f9f9;
}
.locked {
  background-color: #e9e9e9;
}
.invalid {
  background-color: #ffaaaa;
}
@keyframes shake {
  0% {
    transform: rotate(0deg) scale(1);
  }
  15% {
    transform: rotate(-3deg) scale(1.05);
  }
  30% {
    transform: rotate(3deg) scale(0.95);
  }
  45% {
    transform: rotate(-4deg) scale(1.1);
  }
  60% {
    transform: rotate(4deg) scale(0.9);
  }
  75% {
    transform: rotate(-3deg) scale(1.05);
  }
  90% {
    transform: rotate(3deg) scale(1);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}
.shake {
  animation: shake 0.5s cubic-bezier(.90,.50,.50,.90);
  transform-origin: center;
  will-change: transform;
}
</style>
