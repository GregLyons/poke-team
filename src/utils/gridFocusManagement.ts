type GridObject = Element
type GridDirection = 'left' | 'right' | 'up' | 'down' | 'start' | 'end';
type Position = { row: number, col: number };

export const handleGridKeyDown = ({
  grid,
  numRows,
  numCols,
  e,
  interactiveHeaders = false,
}: {
  grid: React.RefObject<HTMLDivElement>
  numRows: number
  numCols: number
  e: React.KeyboardEvent
  interactiveHeaders: boolean
}) => {
  e.preventDefault();
  if (!grid.current) return;

  switch(e.key) {
    case "ArrowLeft":
      return moveFocus(grid.current, "left");
    case "ArrowRight":
      return moveFocus(grid.current, "right");
    case "ArrowUp":
      return moveFocus(grid.current, "up");
    case "ArrowDown":
      return moveFocus(grid.current, "down");
    case "Home":
      return moveFocus(grid.current, "start", interactiveHeaders);
    case "End":
      return moveFocus(grid.current, "end", interactiveHeaders, numRows, numCols);
    default:
  }
};

export function moveFocus(grid: GridObject, direction: GridDirection, interactiveHeaders: boolean = false, numRows?: number, numCols?: number,) {
  const hasFocusableElement = ensureFocusableElementInGrid(grid);
  if (!hasFocusableElement) return;
  switch(direction) {
    case "left":
      return focusLeft(grid);
    case "right":
      return focusRight(grid);
    case "up":
      return focusUp(grid);
    case "down":
      return focusDown(grid);
    case "start":
      return focusStart(grid, interactiveHeaders);
    case "end":
      if (numRows === undefined || numCols === undefined) return;
      return focusEnd(grid, numRows, numCols);
  };
}

const getCurrent: (grid: GridObject) => Element | null = (grid: GridObject) => grid.querySelector('[tabindex="0"]');

function ensureFocusableElementInGrid(grid: GridObject) {
  const firstElem = grid.querySelector("a, button");
  const currentFocusable = getCurrent(grid) || firstElem;

  // If grid has no <a> or <button> elements
  if (!currentFocusable) return false;

  // If no element with tabindex=0, set currentFocusable to firstElem
  currentFocusable.setAttribute("tabindex", "0");
  return true;
}

function focusLeft(grid: GridObject) {
  const currentFocus = getCurrent(grid);
  const nextCell = findNextCell(grid, currentFocus, p => ({
    row: p.row,
    col: p.col - 1,
  }));
  if (!nextCell) return;

  const firstElem = nextCell.querySelector("a, button");
  return transferFocus(currentFocus, firstElem);
}

function focusRight(grid: GridObject) {
  const currentFocus = getCurrent(grid);
  const nextCell = findNextCell(grid, currentFocus, p => ({
    row: p.row,
    col: p.col + 1,
  }));
  if (!nextCell) return;

  const firstElem = nextCell.querySelector("a, button");
  return transferFocus(currentFocus, firstElem);
}

function focusDown(grid: GridObject) {
  const currentFocus = getCurrent(grid);
  const nextCell = findNextCell(grid, currentFocus, p => ({
    row: p.row + 1,
    col: p.col,
  }));
  if (!nextCell) return;

  const firstElem = nextCell.querySelector("a, button");
  return transferFocus(currentFocus, firstElem);
}

function focusUp(grid: GridObject) {
  const currentFocus = getCurrent(grid);
  const nextCell = findNextCell(grid, currentFocus, p => ({
    row: p.row - 1,
    col: p.col,
  }));
  if (!nextCell) return;

  const firstElem = nextCell.querySelector("a, button");
  return transferFocus(currentFocus, firstElem);
}

function focusStart(grid: GridObject, interactiveHeaders: boolean) {
  const currentFocus = getCurrent(grid);
  const firstCell = grid.querySelector(
    `[aria-rowindex="${interactiveHeaders ? 1 : 2}"] [aria-colindex="${interactiveHeaders ? 1 : 2}"]`
  );
   if (!firstCell) return;
  
   const firstElem = firstCell.querySelector("a, button");
   return transferFocus(currentFocus, firstElem);
}

function focusEnd(grid: GridObject, numRows: number, numCols: number) {
  const currentFocus = getCurrent(grid);
  const lastCell = grid.querySelector(
    `[aria-rowindex="${numRows}"] [aria-colindex="${numCols}"]`
  );
  console.log(`[aria-rowindex="${numRows}"] [aria-colindex="${numCols}"]`);

   if (!lastCell) return;
  
   const firstElem = lastCell.querySelector("a, button");
   return transferFocus(currentFocus, firstElem);
}

function getGridPosition(interactiveEl: Element) {
  const row = parseInt(
    interactiveEl?.closest("[aria-rowindex]")?.getAttribute("aria-rowindex") || '', 10
  );
  const col = parseInt(
    interactiveEl?.closest("[aria-colindex]")?.getAttribute("aria-colindex") || '', 10
  );
  return { row, col };
}

function transferFocus(oldEl: Element | null, newEl: Element | null) {
  const newHTMLEl = newEl as HTMLElement;
  if (!oldEl || !newHTMLEl) return;
  oldEl.setAttribute("tabindex", "-1");
  newHTMLEl.setAttribute("tabindex", "0");
  newHTMLEl.focus();
}

function findNextCell(grid: GridObject, el: Element | null, updatePos: (currPos: Position) => Position) {
  if (!el) return;

  // Visit cells and see if they have interactive elements
  const rec: (currPos: Position) => Element | null = (currPos: Position) => {
    const nextPos = updatePos(currPos);
    const nextCell = grid.querySelector(
      `[aria-rowindex="${nextPos.row}"] [aria-colindex="${nextPos.col}"]`
    ) as Element | null;

    // No cell found due to hitting edge of the grid
    if (nextCell === null) return null;

    // Found next cell
    if (nextCell.querySelectorAll("a, button").length) {
      return nextCell;
    }

    return rec(nextPos);
  };

  const pos = getGridPosition(el);
  return rec(pos);
}