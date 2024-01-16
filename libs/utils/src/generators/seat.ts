export function generateDefaultSeatCode(row: number, col: number): string {
  const rowCharacter = String.fromCharCode((row % 26) + 65);
  const colIndex = col < 10 ? `0${col}` : col;
  return rowCharacter + colIndex;
}
