export function generateDefaultSeatCode(row: number, col: number): string {
  const rowCharacter = generateDefaultRowIndex(row);
  const colIndex = col < 10 ? `0${col}` : col;
  return rowCharacter + colIndex;
}

export function generateDefaultRowIndex(row: number): string {
  return String.fromCharCode((row % 26) + 65);
}

export function generateDefaultRowIndexes(maxRow: number): string[] {
  return new Array(maxRow).fill(0).map((v, i) => generateDefaultRowIndex(i));
}
