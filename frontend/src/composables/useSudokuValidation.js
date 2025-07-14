export function useSudokuValidation(board, cellToShake) {
  const mapNumberToSubGrid = n => Math.floor(n / 3) * 3;

  const isRowValid = (row, col, val) => {
    let count = 0;
    for(let i = 0; i < 9; i++) {
      //Check if the value appears more than once in the currently edited cells row (do not shake the cell)
      if(val === board.value[row][i]) {
        count++;
        if(i !== col) {
          cellToShake.value[row][i] = true;
          setTimeout(() => {
            cellToShake.value[row][i] = false;
          }, 50);
        }
      }
    }
    if(count > 1) return false;
    return true;
  };
  
  const isColumnValid = (row, col, val) => {
    let count = 0;
    for(let i = 0; i < 9; i++) {
      //Check if the value appears more than once in the currently edited cells column (do not shake the cell)
      if(val === board.value[i][col]) {
        count++;
        if(i !== row) {
          cellToShake.value[i][col] = true;
          setTimeout(() => {
            cellToShake.value[i][col] = false;
          }, 50);
        }
      }
    }
    if(count > 1) return false;
    return true;
  };
  
  const isSubGridValid = (row, col, val) => {
    const startRow = mapNumberToSubGrid(row);
    const startCol = mapNumberToSubGrid(col);
    let count = 0;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        //Check if the value appears more than once in the currently edited cells subgrid (do not shake cell)
        if(board.value[i][j] == val) {
          count++;
          if(row !== i && col !== j) {
            cellToShake.value[i][j] = true;
            setTimeout(() => {
              cellToShake.value[i][j] = false;
            }, 50);
          }
        }
      }
    }
    if (count > 1) return false;
    return true;
  };

  //TODO: Retroactively check if a previously invalid cell is valid after making a valid move in the vicinity
  //      This might lead to frustrating dead ends though
  //
  //        1:
  //            9 7 x|x x x|2
  //            5 6 x|
  //            4 1 8|
  //
  //                move is invalid
  //                |
  //        2:     \|/
  //            9 7 2|x x x|2 <----- because of this 2
  //            5 6 x|
  //            4 1 8|
  //
  //                because of this 2
  //                |
  //        3:     \|/
  //            9 7 2|x x x|2 
  //            5 6 2|<----- move is invalid
  //            4 1 8|
  //
  //                this move became valid
  //                |
  //        4:     \|/
  //            9 7 3|x x x|2 
  //            5 6 2|<----- this 2 is now valid but still marked as invalid
  //            4 1 8|

  const isMoveValid = (row, col, val) => {
    if (!val || val === '') return true;

    const rowValid = isRowValid(row, col, val);
    const columnValid = isColumnValid(row, col, val);
    const subGridValid = isSubGridValid(row, col, val);

    return rowValid && columnValid && subGridValid;
  };

  return {
    isRowValid,
    isColumnValid,
    isSubGridValid,
    isMoveValid
  };
}
