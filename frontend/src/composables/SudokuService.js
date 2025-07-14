export async function fetchPuzzle(difficulty = 'easy') {
  const response = await fetch('http://localhost:3000/sudoku', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      difficulty,       // "easy", "medium", or "hard"
      solution: true,   // include solution in response
      array: true       // return puzzle as 2D array
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch puzzle: ${response.status}`);
  }

  const data = await response.json();
  return {
    puzzle: data.puzzle,
    solution: data.solution
  };
}