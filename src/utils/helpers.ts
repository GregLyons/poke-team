export const compareStrings = (s1: string, s2: string) => {
  if (s1 < s2) return -1;
  else if (s1 > s2) return 1;
  else return 0;
}

export function sortArray<E> (arr: E[], cmp: (el1: E, el2: E) => number): E[] {
  return arr.sort(cmp);
}

export function binarySearch<E> (
  arr: E[],
  el: E,
  // Positive means el1 is bigger; negative means el2 is bigger; 0 means they're equal
  cmp: (el1: E, el2: E) => number
): number {
  const mid = Math.floor(arr.length / 2);

  // Element is in middle
  if (arr[mid] === el) {
    return mid;
  } 
  // Element is to the left of mid/smaller than mid
  else if (cmp(arr[mid], el) > 0 && arr.length > 1) {
    return binarySearch(arr.slice(0, mid), el, cmp);
  } 
  // Element is to the right of mid/larger than mid
  else if (cmp(arr[mid], el) < 0 && arr.length > 1) {
    return binarySearch(arr.slice(mid, arr.length), el, cmp);
  } 
  // Element is not in the array
  else {
    return -1;
  }
}

export function binaryIncludes<E> (
  arr: E[],
  el: E,
  cmp: (el1: E, el2: E) => number
): boolean {
  return binarySearch(arr, el, cmp) !== -1;
}

export function removeDuplicatesFromSortedArray<E> (
  arr: E[],
  eq: (el1: E, el2: E) => boolean
): E[] {
  let previousElement: E = arr[0];
  return [arr[0]].concat(arr.slice(1)
    .reduce((acc: E[], curr: E) => {
      // curr is duplicate, so continue 
      if (eq(previousElement, curr)) return acc; 

      // the previous element is now curr
      previousElement = curr;
      return acc.concat([curr]);
    }, [] as E[]));
}

export function omitKeys<E> (keys: string[], obj: { [key: string]: E }): { [key: string]: E } {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([k, v]) => !keys.includes(k))
  );
}